# Cobertura Figma ↔ playground ↔ castanha-react

Gerado por `node scripts/integration/build-manifest.js` em 2026-10-12 a partir de `origin/staging` (`ca2b41ae`, 2026-10-07) e do Code Connect `origin/feat/figma-code-connect` (69 arquivos).

| | Componentes |
|---|---:|
| No playground | 112 |
| Com par no React | 72 (68 via Code Connect, 4 via story) |
| Building blocks sem par (internos no React) | 26 |
| Só no Figma/playground | 14 |
| Só no React | 10 |
| Com divergência anotada | 24 |

## Com par no React

| Playground | Nome | React | Via | Notas |
|---|---|---|---|---|
| `alert` | Alert | `Alert` | code-connect |  |
| `async-creatable-select-input` | Async creatable Select Input | `SelectInput` | code-connect | node-id da story (11112-4304) não bate com o Code Connect (11143-3056, 11030-7644, 11143-4833, 11018-5694, 13795-4984) |
| `async-select-input` | Async Select Input | `SelectInput` | code-connect | node-id da story (11112-4304) não bate com o Code Connect (11143-3056, 11030-7644, 11143-4833, 11018-5694, 13795-4984) |
| `avatar` | Avatar | `Avatar` | code-connect |  |
| `backdrop` | Backdrop | `Backdrop` | code-connect |  |
| `badge` | Badge | `Badge` | code-connect |  |
| `balance-card` | Balance Card | `BalanceCard` | code-connect |  |
| `banner` | Banner | `Banner` | story |  |
| `breadcrumb` | Breadcrumb | `Breadcrumbs` | code-connect |  |
| `caju-brand` | Caju Brand | `CajuBrand` | code-connect |  |
| `caju-card` | Caju Card | `CajuCard` | code-connect |  |
| `card` | Card | `Card` | code-connect |  |
| `carousel` | Carousel | `Carousel` | story |  |
| `checkbox` | Checkbox | `Checkbox` | code-connect | node-id da story (4429-10393) não bate com o Code Connect (4123-2560, 4132-1511) |
| `checkbox-group` | Checkbox Group | `Checkbox.Group` | code-connect | node-id da story (4429-10393) não bate com o Code Connect (4123-2560, 4132-1511) |
| `checkbox-select-input` | Checkbox Select Input | `SelectInput` | code-connect | node-id da story (11112-4304) não bate com o Code Connect (11143-3056, 11030-7644, 11143-4833, 11018-5694, 13795-4984) |
| `chips-group` | Chips Group | `Chips.Group` | code-connect | node-id da story (12328-10100) não bate com o Code Connect (12365-2744, 12457-3664, 12365-2728, 14120-5313) |
| `confirmation-message` | Confirmation Message | `ConfirmationMessage` | code-connect |  |
| `content-list` | Content List | `ContentList` | code-connect | node-id da story (5516-8528) não bate com o Code Connect (5488-1482, 5488-675) |
| `content-list-item` | Content List Item | `ContentList.Item` | code-connect | node-id da story (5516-8528) não bate com o Code Connect (5488-1482, 5488-675) |
| `csat-score` | CSAT Score | `CsatScore` | code-connect |  |
| `currency` | Currency | `Currency` | code-connect |  |
| `date-input` | Date Input | `DateInput` | code-connect |  |
| `date-picker` | Date Picker | `DatePicker` | code-connect |  |
| `divider` | Divider | `Divider` | code-connect |  |
| `drawer` | Drawer | `Drawer` | code-connect |  |
| `drop-button` | Drop Button | `DropButton` | code-connect |  |
| `dropzone` | Dropzone | `Dropzone` | code-connect |  |
| `filter-button` | Filter button | `FilterButton` | code-connect | node-id da story (5256-540) não bate com o Code Connect (5099-5389) — é o node de Card |
| `filter-chips` | Filter Chips | `Chips.Filter` | code-connect | node-id da story (12328-10100) não bate com o Code Connect (12365-2744, 12457-3664, 12365-2728, 14120-5313) |
| `fixed-tab` | Fixed Tab | `Tabs` | code-connect |  |
| `icon` | Icon | `Icon` | code-connect |  |
| `icon-button` | Icon Button | `IconButton` | code-connect |  |
| `image` | Image | `Image` | code-connect |  |
| `input-chips` | Input Chips | `Chips.Input` | code-connect | node-id da story (12328-10100) não bate com o Code Connect (12365-2744, 12457-3664, 12365-2728, 14120-5313) |
| `link` | Link | `Link` | code-connect |  |
| `main-button` | Main Button | `Button` | code-connect |  |
| `modal` | Modal | `Modal` | code-connect |  |
| `modal-date-picker` | Modal Date Picker | `DatePickerModal` | code-connect |  |
| `multi-select-input` | Multi Select Input | `SelectInput` | code-connect | node-id da story (11112-4304) não bate com o Code Connect (11143-3056, 11030-7644, 11143-4833, 11018-5694, 13795-4984) |
| `nav-control` | Nav Control | `NavControl` | code-connect |  |
| `nps-score` | NPS Score | `NpsScore` | code-connect |  |
| `pagination` | Pagination | `Pagination` | code-connect |  |
| `password-input` | Password Input | `PasswordInput` | code-connect |  |
| `popover` | Popover | `Popover` | code-connect |  |
| `progress-line` | Progress Line | `ProgressLine` | code-connect |  |
| `progress-tracker` | Progress Tracker | `ProgressTracker` | code-connect | o Code Connect aponta para 14524-1024 (Progress Tracker virou set com Orientation; o node antigo é a variante Vertical) |
| `progress-tracker-item` | Progress Tracker Item | `ProgressTracker.Item` | code-connect |  |
| `radio-button` | Radio Button | `Radio` | code-connect | node-id da story (4429-10395) não bate com o Code Connect (4429-10437, 4429-11192) |
| `radio-button-group` | Radio Button Group | `Radio.Group` | code-connect | node-id da story (4429-10395) não bate com o Code Connect (4429-10437, 4429-11192) |
| `radio-select-input` | Radio Select Input | `SelectInput` | code-connect | node-id da story (11112-4304) não bate com o Code Connect (11143-3056, 11030-7644, 11143-4833, 11018-5694, 13795-4984) |
| `scrollable-tab` | Scrollable Tab | `Tabs` | code-connect |  |
| `search-input` | Search Input | `SearchInput` | code-connect |  |
| `selection-list` | Selection List | `SelectionList` | code-connect | node-id da story (5516-8529) não bate com o Code Connect (5488-1552, 5488-812) |
| `selection-list-item` | Selection List Item | `SelectionList.Item` | code-connect | node-id da story (5516-8529) não bate com o Code Connect (5488-1552, 5488-812) |
| `shaped-icon` | Shaped Icon | `ShapedIcon` | code-connect |  |
| `skeleton` | Skeleton | `Skeleton` | story | a story aponta para 2269-65 (a story do Skeleton aponta para a página Utilities, não para o set (C180)) |
| `slider` | Slider | `Slider` | code-connect |  |
| `spinner` | Spinner | `Spinner` | code-connect |  |
| `status-dot` | Status Dot | `StatusDot` | story |  |
| `switch` | Switch | `Switch` | code-connect | node-id da story (4895-783) não bate com o Code Connect (4895-809) |
| `system-banner` | System Banner | `SystemBanner` | code-connect |  |
| `tab-view` | Tab View | `TabView` | code-connect |  |
| `table` | Table | `Table` | code-connect |  |
| `tag` | Tag | `Tag` | code-connect |  |
| `text-area` | Text Area Input | `Textarea` | code-connect |  |
| `text-input` | Text Input | `TextInput` | code-connect |  |
| `toast` | Toast | `useToast` | code-connect |  |
| `tooltip` | Tooltip | `Tooltip` | code-connect |  |
| `topic` | Topic | `Topic` | code-connect |  |
| `upload-item` | Upload Item | `UploadList.Item` | code-connect |  |
| `upload-list` | Upload List | `UploadList` | code-connect |  |

## Sem par no React

| Playground | Nome | React | Status | Notas |
|---|---|---|---|---|
| `accordion` | Accordion | — | so-figma | o link do playground aponta para uma branch do Figma |
| `accordion-item` | Accordion Item | — | so-figma | o link do playground aponta para uma branch do Figma |
| `bottom-sheet` | Bottom Sheet | — | so-figma |  |
| `breadcrumb-item` | .Item (Breadcrumb) | — | building-block |  |
| `calendar-day` | .Day | — | building-block |  |
| `calendar-week` | .Week | — | building-block |  |
| `close-alert` | .Close Alert | — | building-block |  |
| `close-toast` | .Close Toast | — | building-block |  |
| `code-input-otp` | Code Input OTP | — | so-figma | o link do playground aponta para uma branch do Figma |
| `content-banner` | .Content Banner | — | building-block |  |
| `credit-card-flags` | .Credit Card Flags | — | building-block |  |
| `credit-card-input` | Credit Card Input | — | so-figma | o link do playground aponta para uma branch do Figma |
| `csat-item` | .CSAT Item | — | building-block |  |
| `currency-content` | .Currency Content | — | building-block |  |
| `currency-symbol` | .Currency Symbol | — | building-block |  |
| `date-navigation` | .Navigation Control (Datepicker) | — | building-block |  |
| `file-lead-item` | .Lead item (File) | — | building-block |  |
| `fixed-bar` | [Beta] Fixed Bar | — | so-figma |  |
| `footer` | .Footer | — | building-block |  |
| `header` | .Header | — | building-block |  |
| `icons-block` | .Icons | — | building-block |  |
| `lead-item` | .Lead item | — | building-block |  |
| `list-lead-item` | .Lead Item (Lists) | — | building-block |  |
| `nav-control-item` | .Item Nav Control | — | building-block |  |
| `nps-value-item` | .Value Item | — | building-block |  |
| `quantity-input` | [Beta] Quantity Input | — | so-figma |  |
| `select-number` | .Select Number | — | building-block |  |
| `sponsor-category` | .Category | — | so-figma |  |
| `sponsor-header` | Header | — | so-figma |  |
| `sponsor-side-menu` | Side Menu | — | so-figma |  |
| `sponsor-subcategory` | .Subcategory | — | so-figma |  |
| `sponsor-user-profile` | .User Profile | — | so-figma |  |
| `switch-group` | Switch Group | — | so-figma |  |
| `tab-item` | .Item (Tabs) | — | building-block |  |
| `table-cell` | .Data Cell | — | building-block |  |
| `table-head` | .Head | — | building-block |  |
| `table-toolbar` | .Toolbar | — | building-block |  |
| `text-content` | .Text Content | — | building-block |  |
| `trailing-item` | .Trailing Item | — | building-block |  |
| `viewport-restriction` | Viewport Restriction | — | so-figma |  |

## Só no React

| Componente | Exportado | Na main | Tags | Node-id da story |
|---|---|---|---|---|
| `Box` | sim | sim | no-figma | — |
| `Field` | sim | sim | no-figma | — |
| `Grid` | sim | sim | no-figma | — |
| `Illustration` | sim | sim | no-figma | — |
| `Motion` | sim | sim | no-figma | — |
| `Portal` | sim | sim | no-figma | — |
| `Shortcut` | sim | sim | new | — |
| `Stack` | sim | sim | no-figma | — |
| `Text` | sim | sim | no-figma | — |
| `VisuallyHidden` | sim | sim | no-figma | — |
