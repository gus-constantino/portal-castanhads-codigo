#!/usr/bin/env node
/**
 * Lint de conteúdo dos fluxos do onboarding (services/onboarding/flows/*.flow.js) — D314, plano §4 e §5.5.
 * Lê cada fluxo num contexto isolado (vm) e confere as regras do guia de Conteúdo (resources/conteudo) que valem para o tour:
 *   título até 30 caracteres, sem ponto, exclamação ou dois-pontos no fim · título + texto até 110 · texto termina com ponto
 *   · sem emoji · no máximo 3 passos de tour (benchmarks do plano §14) · ilustração que existe no catálogo
 *   · palavras do Termos para evitar e dos princípios do castanha-ai (Ver, visualizar, Ops, Entendi, Pular, fácil, só…).
 * Os rótulos dos botões não estão nos fluxos: vêm do motor (services/onboarding/onboarding.js), que segue os padronizados.
 * Uso: node scripts/dev/lint-onboarding.js  (sai com 1 se houver erro) · o build-index.js chama e reprova o build.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// palavra inteira com acento (o \b do JavaScript não entende "só" nem "próximo")
const w = (alts) => new RegExp("(^|[^\\p{L}])(?:" + alts + ")(?![\\p{L}])", "iu");
const BANNED = [
  [w("ver"), "Ver (use Acessar, Conhecer ou o nome da área)"], [w("visualizar"), "visualizar"], [w("veja"), "veja (use consulte)"],
  [w("ops|ei|hmm+|beleza"), "interjeição (premissa 3)"], [w("entendi"), "Entendi"], [w("pular"), "Pular (use Me lembrar mais tarde)"],
  [w("avançar|próximo|finalizar|encerrar"), "rótulo fora do padrão"], [w("funcionalidades?|feature"), "termo de produto (conteudo.js:997)"],
  [w("fácil|simples|rápido|apenas|só"), "promessa vaga (princípios do castanha-ai)"], [w("login|dashboard|feedback"), "estrangeirismo"]
];
const EMOJI = /\p{Extended_Pictographic}/u;

function lint(ROOT){
  const DIR = path.join(ROOT, "services", "onboarding", "flows"), errors = [], warnings = [], flows = [], checklists = [], trails = [];
  if (!fs.existsSync(DIR)) return { errors, warnings, flows };
  const cat = JSON.parse(fs.readFileSync(path.join(ROOT, "assets", "illustrations", "catalog.json"), "utf8"));
  const ills = new Set(); (cat.buckets || []).forEach((b) => (b.items || []).forEach((i) => ills.add(b.id + "/" + (i.name || i.id))));
  fs.readdirSync(DIR).filter((f) => f.endsWith(".flow.js")).sort().forEach((f) => {
    const CDS = { onboarding: { register: (fl) => flows.push(Object.assign({ file: f }, fl)), checklist: (c) => checklists.push(Object.assign({ file: f }, c)), trail: (t) => trails.push(Object.assign({ file: f }, t)) } };
    try { vm.runInNewContext(fs.readFileSync(path.join(DIR, f), "utf8"), { window: { CDS }, CDS, console }, { filename: f }); }
    catch (e) { errors.push(f + ": não roda (" + e.message + ")"); }
  });
  flows.forEach((fl) => {
    const where = (i) => fl.file + " › " + fl.id + " › passo " + (i + 1);
    if (!fl.id || !Array.isArray(fl.steps) || !fl.steps.length){ errors.push(fl.file + ": fluxo sem id ou sem passos"); return; }
    const tour = fl.steps.filter((s) => s.kind !== "modal"), etapas = new Set(tour.map((s, i) => s.group ? "g" + s.group : i));
    if (etapas.size > 3) errors.push(fl.file + " › " + fl.id + ": " + etapas.size + " etapas de tour (máximo 3)");
    fl.steps.forEach((s, i) => {
      const t = String(s.title || ""), x = String(s.text || "");
      if (!t) errors.push(where(i) + ": sem título");
      if (t.length > 30) errors.push(where(i) + ": título com " + t.length + " caracteres (máximo 30): " + t);
      if (/[.!:]$/.test(t)) errors.push(where(i) + ": título termina com pontuação: " + t);
      if ((t + x).length > 110) errors.push(where(i) + ": título e texto com " + (t + x).length + " caracteres (máximo 110)");
      if (x && !/\.$/.test(x)) errors.push(where(i) + ": texto sem ponto final");
      if ((x.match(/!/g) || []).length > 1) errors.push(where(i) + ": mais de uma exclamação");
      if (EMOJI.test(t + x)) errors.push(where(i) + ": emoji (o onboarding não usa)");
      BANNED.forEach(([re, why]) => { if (re.test(t + " " + x)) errors.push(where(i) + ": " + why); });
      if (s.kind !== "modal" && !s.anchor) errors.push(where(i) + ": passo de tour sem anchor");
      if (s.illustration && !ills.has(s.illustration)) errors.push(where(i) + ": ilustração fora do catálogo: " + s.illustration);
      if ((x.match(/,/g) || []).length > 3) warnings.push(where(i) + ": mais de 3 vírgulas");
    });
  });
  // Primeiros passos: rótulo curto e sem pontuação no fim, texto com ponto, as mesmas palavras a evitar, até 5 tarefas por perfil
  checklists.forEach((ck) => {
    (ck.profiles || []).forEach((p) => {
      const tasks = (ck.common || []).concat(p.tasks || []);
      if (tasks.length > 5) errors.push(ck.file + " › " + p.id + ": " + tasks.length + " tarefas (máximo 5)");
      tasks.forEach((t) => {
        const at = ck.file + " › " + p.id + " › " + t.id, l = String(t.label || ""), x = String(t.text || "");
        if (!l || l.length > 30) errors.push(at + ": rótulo vazio ou com mais de 30 caracteres");
        if (/[.!:]$/.test(l)) errors.push(at + ": rótulo termina com pontuação");
        if (x && !/\.$/.test(x)) errors.push(at + ": texto sem ponto final");
        if (!t.done) errors.push(at + ": sem regra de conclusão (done)");
        BANNED.forEach(([re, why]) => { if (re.test(l + " " + x)) errors.push(at + ": " + why); });
      });
    });
  });
  // Trilha Explorar: título até 40 (as paradas citam nomes de componentes), texto com ponto, rota interna, sem palavras a evitar.
  // O estrangeirismo fica de fora: as paradas usam o nome exato do Figma (ex.: Feedback Page)
  trails.forEach((tr) => {
    const seen = new Set();
    (tr.blocks || []).forEach((b) => {
      if (!b.id || seen.has(b.id)) errors.push(tr.file + ": bloco sem id ou repetido: " + b.id); seen.add(b.id);
      (b.items || []).forEach((it, i) => {
        const at = tr.file + " › " + b.id + " › " + (i + 1), [l, x, href] = it.map(String);
        if (!l || l.length > 40) errors.push(at + ": título vazio ou com mais de 40 caracteres");
        if (/[.!:]$/.test(l)) errors.push(at + ": título termina com pontuação");
        if (!/\.$/.test(x)) errors.push(at + ": texto sem ponto final");
        if (!/^#\/[\w-]/.test(href)) errors.push(at + ": link fora do portal: " + href);
        BANNED.filter(([, why]) => why !== "estrangeirismo").forEach(([re, why]) => { if (re.test(l + " " + x)) errors.push(at + ": " + why); });
      });
    });
  });
  return { errors, warnings, flows, trails };
}
module.exports = lint;

if (require.main === module){
  const r = lint(path.join(__dirname, "..", ".."));
  r.warnings.forEach((w) => console.warn("⚠️ onboarding: " + w));
  r.errors.forEach((e) => console.error("❌ onboarding: " + e));
  console.log((r.errors.length ? "❌" : "✅") + " Onboarding: " + r.flows.length + " fluxo(s), " + r.flows.reduce((n, f) => n + f.steps.length, 0) + " passos · " + r.errors.length + " erro(s)");
  process.exit(r.errors.length ? 1 : 0);
}
