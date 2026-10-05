/**
 * @deps text-field popover selection-list-item content-list-item input-chip
 * CDS.SelectField — base dos 5 Select Inputs (Text Fields · Async 11030:7644 · Radio 11143:3056 · Checkbox 11143:4833 ·
 * Async creatable 11018:5694 · Multi 13795:4984). Não é um elemento registrado.
 *
 * Mesma anatomia e props do Text Input (CDS.TextField). O Icon Button (Ghost · Neutral · Medium) troca
 * dropdown-open-line ↔ dropdown-close-line; Is Active=True abre o Popover com as opções:
 *   Selection List Item (Show Lead Item, Show Divider e Show Description desligados) com o .Trailing Item de cada membro;
 *   no Async creatable, um Content List Item "Adicionar "…"" com plus-line.
 *
 * Acessibilidade: padrão combobox do WAI-ARIA. O foco fica no <input role="combobox">; as opções são role="option"
 * dentro de role="listbox" e a opção atual vai em aria-activedescendant. Setas, Enter, Esc e Tab.
 *
 * Opções: filhos <option value="…">rótulo</option> (lidos uma vez) ou a propriedade .options = [{ value, label, disabled }].
 * Async: .loadOptions = function(query){ return Promise<[{ value, label }]> } — sem ela, filtra as opções locais.
 * Atributos: os do Text Input · value (um valor; nos múltiplos, separados por vírgula) · open · empty-text
 * Eventos: cds-change { value, values, labels } · cds-toggle { open } · cds-create { label } (creatable)
 *
 * Membro define: get searchable · get multiple · get optionTrailing · get popoverGap · displayText()
 */
(function(){
  "use strict";
  var uid = 0;
  function norm(s){ return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }

  class SelectField extends CDS.TextField {
    static get observedAttributes(){ return CDS.TextField.observedAttributes.concat(["open", "empty-text"]); }
    constructor(){ super(); this._sid = "cds-sel-" + (++uid); this._options = null; this._selected = null; this._query = null; this._shown = []; this._cur = -1; }

    // ----- ganchos -----
    get searchable(){ return true; }
    get multiple(){ return false; }
    get optionTrailing(){ return "none"; }
    get popoverGap(){ return 8; }
    get creatable(){ return false; }
    get multiSelect(){ return this.multiple || this.optionTrailing === "checkbox"; } // Checkbox Select: vários valores, sem chips
    get defaultPlaceholder(){ return "Placeholder"; }
    get fallbackName(){ return "Selecionar"; }
    displayText(){ var o = this.optionFor(this._selected[0]); return o ? o.label : ""; }

    // ----- opções e valor -----
    get options(){ return this._options || []; }
    set options(list){ this._options = (list || []).map(function(o){ return typeof o === "string" ? { value: o, label: o } : { value: String(o.value), label: o.label == null ? String(o.value) : String(o.label), disabled: !!o.disabled }; }); if (this._built){ this.update(); if (this.isOpen) this.renderList(); } }
    optionFor(v){ return this.options.find(function(o){ return o.value === v; }) || (this._extra && this._extra[v]); }
    get values(){ return (this._selected || []).slice(); }
    get value(){ return (this._selected || []).join(","); }
    set value(v){ this._selected = parseValue(v, this.multiSelect); this._query = null; if (this._built) this.update(); }
    get displayValue(){ return this._query != null ? this._query : this.displayText(); }

    attributeChangedCallback(name){
      if (name === "value") this._selected = null;
      if (name === "open" && this._built){ if (this.hasAttribute("open")) this.openList(); else this.closeList(); }
      if (this.isConnected) this.render();
    }
    render(){
      if (!this._built && this._options == null){
        // filhos <option> viram as opções (o build do TextField limpa o conteúdo)
        var opts = [].slice.call(this.querySelectorAll("option"));
        if (opts.length) this.options = opts.map(function(o){ return { value: o.value, label: o.textContent.trim(), disabled: o.disabled }; });
      }
      if (this._selected == null) this._selected = parseValue(this.getAttribute("value"), this.multiSelect);
      super.render();
    }

    // ----- montagem -----
    configureControl(ctrl){
      var self = this;
      ctrl.setAttribute("role", "combobox");
      ctrl.setAttribute("aria-autocomplete", this.searchable ? "list" : "none");
      ctrl.setAttribute("aria-expanded", "false");
      ctrl.setAttribute("aria-controls", this._sid + "-list");
      ctrl.autocomplete = "off";
      if (!this.searchable) ctrl.readOnly = true;
      ctrl.addEventListener("keydown", function(e){ self.onKey(e); });
      // focusout + relatedTarget (síncrono): setTimeout atrasa com a aba oculta (A50)
      this.addEventListener("focusout", function(e){ if (!e.relatedTarget || !self.contains(e.relatedTarget)) self.closeList(); });
    }
    buildTrailing(box){
      var self = this;
      this.classList.add("cds-tf--select");
      var b = this.toggleBtn = CDS.create("cds-icon-button", { kind: "ghost", appearance: "neutral", size: "medium", icon: "dropdown-open-line" }, "cds-tf__action");
      b.addEventListener("mousedown", function(e){ e.preventDefault(); }); // o foco fica no combobox
      b.addEventListener("click", function(){ if (self.disabled) return; self.control.focus(); self.toggleList(); });
      box.appendChild(b);
      box.addEventListener("click", function(e){
        if (self.disabled || e.target.closest("cds-icon-button") || e.target.closest("cds-input-chip")) return;
        if (self.searchable) self.openList(); else self.toggleList();
      });
      if (this.multiple){
        this.chipsEl = CDS.create("div", { role: "list", "aria-label": "Selecionados" }, "cds-sel__chips");
        this.content.insertBefore(this.chipsEl, this.control);
        // Foco ao remover (regra do SelectInput múltiplo do castanha-react): pelo teclado, vai para o chip que fica na mesma
        // posição (o próximo) ou, sem chip ali, para o campo; pelo mouse, para o campo. Backspace/Delete no chip também removem.
        var removeChip = function(chip, keyboard){
          var i = [].indexOf.call(self.chipsEl.querySelectorAll("cds-input-chip"), chip);
          self.toggleValue(chip.dataset.value);
          var next = keyboard ? self.chipsEl.querySelectorAll("cds-input-chip")[i] : null;
          if (next && next.button) next.button.focus(); else self.control.focus();
        };
        this.chipsEl.addEventListener("cds-remove", function(e){
          e.preventDefault();
          var chip = e.target.closest("cds-input-chip");
          if (chip) removeChip(chip, !!(e.detail && e.detail.keyboard)); else self.control.focus();
        });
        this.chipsEl.addEventListener("keydown", function(e){
          var chip = e.target.closest("cds-input-chip");
          if (chip && !self.disabled && (e.key === "Backspace" || e.key === "Delete")){ e.preventDefault(); removeChip(chip, true); }
        });
      }
      // Popover (manual: o próprio campo controla abrir e fechar)
      var pop = this.pop = CDS.create("cds-popover", { popover: "manual", label: "Opções" }, "cds-sel__popover");
      var list = this.listEl = CDS.create("div", { role: "listbox", id: this._sid + "-list" }, "cds-sel__list");
      if (this.multiSelect) list.setAttribute("aria-multiselectable", "true");
      list.addEventListener("mousedown", function(e){ e.preventDefault(); });
      list.addEventListener("click", function(e){
        var item = e.target.closest("[data-index]"); if (!item || item.hasAttribute("disabled")) return;
        self.choose(parseInt(item.dataset.index, 10));
      });
      list.addEventListener("pointermove", function(e){ var item = e.target.closest("[data-index]"); if (item) self.setCurrent(parseInt(item.dataset.index, 10), false); });
      pop.appendChild(list);
      pop.addEventListener("cds-toggle", function(e){ if (e.target === pop) e.stopPropagation(); }); // o campo emite o próprio cds-toggle
      this.appendChild(pop);
      this._reposition = function(){ if (self.isOpen) self.place(); };
      this._outside = function(e){ if (self.isOpen && !self.contains(e.target)) self.closeList(); };
    }
    connectedCallback(){ super.connectedCallback(); window.addEventListener("resize", this._reposition); window.addEventListener("scroll", this._reposition, true); document.addEventListener("pointerdown", this._outside, true); }
    disconnectedCallback(){ window.removeEventListener("resize", this._reposition); window.removeEventListener("scroll", this._reposition, true); document.removeEventListener("pointerdown", this._outside, true); }

    updateTrailing(){
      if (!this.toggleBtn) return;
      var b = this.toggleBtn, open = this.isOpen;
      b.setAttribute("icon", open ? "dropdown-close-line" : "dropdown-open-line");
      b.setAttribute("label", open ? "Fechar opções" : "Abrir opções");
      b.hidden = !this.flag("show-trailing-item");
      if (this.disabled) b.setAttribute("disabled", ""); else b.removeAttribute("disabled");
      var ib = b.querySelector("button"); if (ib){ ib.tabIndex = -1; ib.setAttribute("aria-hidden", "true"); }
      this.updateChips();
    }
    update(){
      super.update();
      this.classList.toggle("is-filled", this._selected.length > 0);
      this.listEl.setAttribute("aria-label", this.getAttribute("label") || this.fallbackName);
    }
    updateChips(){
      if (!this.chipsEl) return;
      // com chips, sem placeholder
      this.control.placeholder = this._selected.length ? "" : (this.hasAttribute("placeholder") ? this.getAttribute("placeholder") : this.defaultPlaceholder);
      var self = this, want = this._selected.join("\u0000");
      if (this.chipsEl._key === want) return;
      this.chipsEl._key = want; this.chipsEl.innerHTML = "";
      this._selected.forEach(function(v){
        var o = self.optionFor(v), wrap = CDS.create("div", { role: "listitem" }, "cds-sel__chip");
        var chip = CDS.create("cds-input-chip", { label: o ? o.label : v, "show-lead-icon": "false" });
        chip.dataset.value = v; wrap.appendChild(chip); self.chipsEl.appendChild(wrap);
      });
      this.chipsEl.hidden = !this._selected.length;
    }

    // ----- abrir / fechar -----
    get isOpen(){ return !!this.pop && this.pop.matches(":popover-open"); }
    openList(){
      if (this.isOpen || this.disabled) return;
      this.renderList();
      this.pop.showPopover();
      this.place();
      this.classList.add("is-open");
      this.control.setAttribute("aria-expanded", "true");
      if (!this.hasAttribute("open")) this.setAttribute("open", "");
      this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: true }, bubbles: true }));
    }
    closeList(){
      if (!this.isOpen) return;
      this.pop.hidePopover();
      this.classList.remove("is-open");
      this.control.setAttribute("aria-expanded", "false"); this.control.removeAttribute("aria-activedescendant");
      this._cur = -1;
      if (this._query != null && !this.multiple){ this._query = null; this.control.value = this.displayValue; } // sem escolha, volta ao valor
      if (this.hasAttribute("open")) this.removeAttribute("open");
      this.updateTrailing();
      this.dispatchEvent(new CustomEvent("cds-toggle", { detail: { open: false }, bubbles: true }));
    }
    toggleList(){ if (this.isOpen) this.closeList(); else this.openList(); }
    place(){
      var box = this.box, w = box.getBoundingClientRect().width;
      this.pop.style.width = Math.round(w) + "px"; this.pop.style.maxWidth = "none";
      CDS.position(box, this.pop, { placement: "bottom-start", gap: this.popoverGap });
    }

    // ----- lista -----
    renderList(){
      var self = this, q = this.searchable ? (this._query || "") : "";
      var gen = this._gen = (this._gen || 0) + 1;
      var done = function(list){ if (gen === self._gen) self.paint(list, q); };
      if (this.loadOptions && this.searchable){
        this.listEl.setAttribute("aria-busy", "true");
        Promise.resolve(this.loadOptions(q)).then(function(list){
          self.listEl.removeAttribute("aria-busy");
          // guarda os rótulos das opções vindas de fora para mostrar o valor escolhido
          self._extra = self._extra || {}; (list || []).forEach(function(o){ o = typeof o === "string" ? { value: o, label: o } : o; self._extra[String(o.value)] = { value: String(o.value), label: String(o.label == null ? o.value : o.label) }; });
          done((list || []).map(function(o){ return typeof o === "string" ? { value: o, label: o } : { value: String(o.value), label: String(o.label == null ? o.value : o.label), disabled: !!o.disabled }; }));
        });
      } else {
        var nq = norm(q);
        done(this.options.filter(function(o){ return !nq || norm(o.label).indexOf(nq) >= 0; }));
      }
    }
    paint(list, q){
      var self = this, L = this.listEl, items = [];
      L.innerHTML = "";
      if (this.creatable && q.trim() && !list.some(function(o){ return norm(o.label) === norm(q); })) items.push({ create: q.trim() });
      list.forEach(function(o){ items.push(o); });
      this._shown = items;
      items.forEach(function(o, i){
        var n;
        if (o.create){
          n = CDS.create("cds-content-list-item", { option: "", "show-trailing-item": "false", "show-divider": "false", "show-description": "false",
            "lead-kind": "icon", "lead-icon": "plus-line", label: "Adicionar “" + o.create + "”" });
        } else {
          n = CDS.create("cds-selection-list-item", { option: "", "trailing-item": self.optionTrailing, "show-lead-item": "false", "show-divider": "false", "show-description": "false", label: o.label });
          if (self._selected.indexOf(o.value) >= 0) n.setAttribute("is-active", "");
          if (o.disabled) n.setAttribute("disabled", "");
        }
        n.id = self._sid + "-o" + i; n.dataset.index = i; n.className = "cds-sel__option";
        L.appendChild(n);
      });
      if (!items.length) L.appendChild(CDS.create("div", { role: "presentation" }, "cds-sel__empty")).textContent = this.getAttribute("empty-text") || "Nenhuma opção encontrada";
      var sel = items.findIndex(function(o){ return !o.create && self._selected.indexOf(o.value) >= 0; });
      this.setCurrent(this._cur >= 0 && this._cur < items.length ? this._cur : (q && items.length ? 0 : sel), false);
      if (this.isOpen) this.place();
    }
    optionNode(i){ return this.listEl.querySelector('[data-index="' + i + '"]'); }
    setCurrent(i, scroll){
      var prev = this.optionNode(this._cur); if (prev && prev.row) prev.row.classList.remove("is-current");
      this._cur = i;
      var n = this.optionNode(i);
      if (n && n.row){ n.row.classList.add("is-current"); this.control.setAttribute("aria-activedescendant", n.row.id); if (scroll !== false) n.scrollIntoView({ block: "nearest" }); }
      else this.control.removeAttribute("aria-activedescendant");
    }
    move(d){
      var n = this._shown.length; if (!n) return;
      var i = this._cur;
      for (var k = 0; k < n; k++){ i = i < 0 ? (d > 0 ? 0 : n - 1) : (i + d + n) % n; if (!this._shown[i].disabled) break; }
      this.setCurrent(i, true);
    }
    choose(i){
      var o = this._shown[i]; if (!o || o.disabled) return;
      if (o.create){
        var v = o.create; this._options = this.options.concat([{ value: v, label: v }]);
        this.dispatchEvent(new CustomEvent("cds-create", { detail: { label: v }, bubbles: true }));
        o = { value: v, label: v };
      }
      if (this.multiSelect){
        this.toggleValue(o.value);
        if (this.multiple){ this._query = ""; this.control.value = ""; this.renderList(); }
        else this.paintActive();
      } else {
        this._selected = [o.value]; this._query = null;
        this.control.value = this.displayValue;
        this.closeList(); this.emit();
        this.updateTrailing(); this.classList.add("is-filled");
      }
    }
    paintActive(){ var self = this; this._shown.forEach(function(o, i){ var n = self.optionNode(i); if (n && !o.create) n.toggleAttribute("is-active", self._selected.indexOf(o.value) >= 0); }); }
    toggleValue(v){
      var at = this._selected.indexOf(v);
      if (at >= 0) this._selected.splice(at, 1); else this._selected.push(v);
      if (this._query == null || !this.multiple) this.control.value = this.displayValue;
      this.classList.toggle("is-filled", this._selected.length > 0);
      this.updateTrailing(); this.paintActive(); if (this.isOpen) this.place();
      this.emit();
    }
    emit(){
      var self = this;
      this.dispatchEvent(new CustomEvent("cds-change", { detail: { value: this.value, values: this.values, labels: this.values.map(function(v){ var o = self.optionFor(v); return o ? o.label : v; }) }, bubbles: true }));
    }

    // ----- teclado e digitação -----
    onInput(){
      if (!this.searchable) return;
      this._query = this.control.value; this._cur = -1;
      if (!this.isOpen) this.openList(); else this.renderList();
    }
    onKey(e){
      var open = this.isOpen;
      switch (e.key){
        case "ArrowDown": e.preventDefault(); if (!open){ this.openList(); if (this._cur < 0) this.move(1); } else this.move(1); break;
        case "ArrowUp": e.preventDefault(); if (!open) this.openList(); this.move(-1); break;
        case "Home": if (open && !this.searchable){ e.preventDefault(); this._cur = -1; this.move(1); } break;
        case "End": if (open && !this.searchable){ e.preventDefault(); this._cur = -1; this.move(-1); } break;
        case "Enter": if (open && this._cur >= 0){ e.preventDefault(); this.choose(this._cur); } else if (!open && !this.searchable){ e.preventDefault(); this.openList(); } break;
        case " ": if (!this.searchable){ e.preventDefault(); if (open && this._cur >= 0) this.choose(this._cur); else this.openList(); } break;
        case "Escape": if (open){ e.preventDefault(); this.closeList(); } else if (this.searchable && this.control.value && !this.multiple){ e.preventDefault(); this._selected = []; this._query = null; this.control.value = ""; this.classList.remove("is-filled"); this.emit(); } break;
        case "Tab": this.closeList(); break;
        case "Backspace": if (this.multiple && !this.control.value && this._selected.length){ this.toggleValue(this._selected[this._selected.length - 1]); } break;
      }
    }
  }
  function parseValue(v, multiple){ if (v == null || v === "") return []; return multiple ? String(v).split(",").map(function(s){ return s.trim(); }).filter(Boolean) : [String(v)]; }

  CDS.SelectField = SelectField;
})();
