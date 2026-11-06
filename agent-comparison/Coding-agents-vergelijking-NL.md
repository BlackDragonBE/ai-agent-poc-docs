# Coding agents vergeleken

Bekijk de [interactieve webversie](index.html): vergelijk één onderwerp tegelijk met agentkaarten, of volg een route rond veilig beginnen, uitbreidingen of grotere workflows. Alle vijf agents staan standaard in de vergelijking; klik op een agent om die uit je selectie te halen of opnieuw toe te voegen. Op brede schermen staan de geselecteerde agents in één rij, zonder horizontaal schuiven. Op kleinere schermen worden dat twee kolommen of één gestapelde kolom. Bronverwijzingen openen in een dialoog; met Escape keer je terug naar de vergelijking.

De titel staat in de bovenbalk; de routekeuze, agentselectie, navigatie en kaarten zijn compact gehouden. Bij een browservenster van 1280×720 of 1366×768 passen alle vijf agents en de volledige onderwerpennavigatie op één scherm, voor elk onderwerp en elke verkenroute. Op kleinere schermen of bij vergrote tekst kan de pagina verticaal doorlopen: de inhoud wordt niet afgekapt om alles te laten passen.

De webversie opent standaard in donkere modus. Met de themaknop rechtsboven schakel je naar een lichte weergave.

Open `index.html` rechtstreeks in je browser; een installatie, webserver of internetverbinding is niet nodig voor de pagina zelf. De zoekfunctie doorzoekt onderwerpen en de tekst van alle vijf agents. De adresbalk verwijst naar het gekozen onderwerp, bijvoorbeeld `index.html#mcp`. Externe brondocumentatie vereist wel internet.

**Onderhoud webversie:** de tabellen en bronnen staan als gewone HTML in `index.html`; de agentkaarten nemen deze inhoud over. Werk dit Markdown-document en die HTML bij wanneer de productinformatie verandert. `js/vergelijking.js` bevat de onderwerpvolgorde, leeswijzers, verkenroutes en interacties; houd de onderwerpvolgorde gelijk aan die van de HTML-tabellen. `css/vergelijking.css` bevat de paginaspecifieke opmaak. De basisopmaak wordt gedeeld met `../ai-basics/begrippen-interactief/css/basis.css`; behoud die relatieve mapstructuur wanneer je de pagina kopieert. Zonder JavaScript en bij afdrukken blijft de volledige vergelijking in tabelvorm beschikbaar.

| Agent | Sterk in | Werkomgeving / profiel |
| --- | --- | --- |
| Codex | Werken aan code vanuit terminal, editor of cloud. | Officiële VS Code-extensie. |
| Claude Code | Eigen workflows met skills, subagents, plugins, hooks en mods. | Terminal en officiële VS Code-extensie. |
| Copilot | GitHub- en VS Code-integratie; ruime modelkeuze. | CLI, editor en cloudagent. |
| Lurus Code | Geïntegreerde code-review en securityscans; model- en providerkeuze. | Lurus-platform. |
| omp | Taalserver, debugger en uitgebreide aanpasbaarheid. | Terminal met programmeerbare extensies. |

## Veiligheid

| Agent | Belangrijkste verschil |
| --- | --- |
| Codex | Afzonderlijke instellingen voor sandbox en goedkeuring; schrijfbevoegdheid is geen goedkeuring per edit. [Veiligheidsinstellingen](https://learn.chatgpt.com/docs/agent-approvals-security.md) |
| Claude Code | Planmodus en instelbare toolrechten; mods draaien met de rechten van de gebruiker. [Permissies](https://code.claude.com/docs/en/permissions.md) · [Mods](https://code.claude.com/docs/en/plugins/mods/overview) |
| Copilot | Rechten en goedkeuringen verschillen tussen CLI, editor en cloudagent. [CLI](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) |
| Lurus Code | Ask/Plan en instelbare permissies; Ask/Plan blokkeren niet automatisch alle processen. [Permissies](https://code.lurus.ai/en/docs/permissions/) |
| omp | Standaard YOLO; goedkeuring expliciet inschakelen met `--approval-mode always-ask-cached`. [Approvalmodi](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/approval-mode.md) |

## 1. Projectinstructies

| Agent | Projectregels | Eigen prompt en stijl |
| --- | --- | --- |
| Codex | `AGENTS.md` en `AGENTS.override.md`. | `developer_instructions` en `model_instructions_file`. [1] |
| Claude Code | `CLAUDE.md`; ondersteuning voor `AGENTS.md` afhankelijk van versie. | Systeemprompt aanvullen of vervangen; output styles. [2] |
| Copilot | `AGENTS.md` en Copilot-instructies; verschilt per omgeving. | Custom instructions en custom agents. [3] |
| Lurus Code | `LURUS.md`; `AGENTS.md` expliciet importeren. | Projectregels en prompts voor custom agents. [4] |
| omp | Meerdere conventies, met eigen laadprioriteiten. | `SYSTEM.md`, `APPEND_SYSTEM.md`, templates en personality-presets. [5] |

## 2. Vaardigheden

### Skills

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | Skills, ook te bundelen in plugins. [1] |
| Claude Code | Skills, los of als onderdeel van plugins. [2] |
| Copilot | Skills; CLI-plugins kunnen ze bundelen met agents en hooks. [3] |
| Lurus Code | Skills en GitHub-pakketten; externe skills starten inactief. [4] |
| omp | Skills met compatibiliteitsimports uit andere agentconventies. [5] |

### MCP

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | MCP-integratie, ook via plugins. [1] |
| Claude Code | MCP-integratie, los configureerbaar of gebundeld in plugins. [2] |
| Copilot | MCP-integratie; configuratie verschilt tussen CLI, editor en cloud. [3] |
| Lurus Code | MCP-integratie binnen de Lurus-workflow. [4] |
| omp | MCP-integratie met automatische discovery. [5] |

### Plugins / extensions

| Agent | Uitbreidingsvorm |
| --- | --- |
| Codex | Plugins voor onder meer skills, hooks en MCP-koppelingen. [1] |
| Claude Code | Plugins bundelen onder meer skills, agents, hooks, MCP en output styles. [2] |
| Copilot | CLI-plugins en experimentele JavaScript-CLI-extensies; daarnaast VS Code-extensies. [3] |
| Lurus Code | Installeerbare skill- en agentpakketten; geen gelijkwaardig algemeen extensiesysteem bevestigd. [4] |
| omp | TypeScript/JavaScript-extensies voor tools, commando's, interface en sessiegedrag. [5] |

### Hooks

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | Lifecycle-hooks via `hooks.json`, `config.toml` of plugins. [1] |
| Claude Code | Settings-hooks via shellcommando's, HTTP of prompts; daarnaast interne functiehooks in mods. [2] |
| Copilot | Hooks in de CLI en cloudagent; ook te bundelen in CLI-plugins. [3] |
| Lurus Code | Eigen hooks voor workflowautomatisering. [4] |
| omp | Eventhandlers in extensies, onder meer voor sessies, agentgedrag en toolcalls. [5] |

### Mods

| Agent | Mods en vergelijkbare runtime-aanpassingen |
| --- | --- |
| Codex | Geen equivalent van Claude-mods bevestigd; wel plugins en lifecycle-hooks. [1] |
| Claude Code | Officiële JavaScript/TypeScript-mods binnen Claude Code: prompts en toolcalls onderscheppen of herschrijven, interactieve UI toevoegen en ingebouwde functies vervangen. Installatie via plugins. [2] |
| Copilot | CLI-extensies voor eigen tools en slashcommando's; gelijkwaardige UI- en runtime-overrides niet bevestigd. [3] |
| Lurus Code | Geen equivalent van Claude-mods bevestigd; skill- en agentpakketten zijn geen runtime-mods. [4] |
| omp | Vergelijkbare mogelijkheden via TypeScript/JavaScript-extensies: toolcalls onderscheppen, rendering aanpassen, commando's en tools toevoegen en sessies beïnvloeden. [5] |

### Subagents / multi-agent

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | Parallelle subagents met eigen threads; custom agents met eigen instructies, model en redeneerinstelling. [7] |
| Claude Code | Subagents met eigen context, instructies en tools; dynamische workflows voor grotere groepen agents. [8] |
| Copilot | Parallelle subagents via `/fleet`; ook niet-interactief met `--fleet`. [9] |
| Lurus Code | Custom agents zijn read-only specialisten; aparte orchestrator met planner-, implementer- en reviewerrollen vereist ULTRA. [10] |
| omp | Parallelle subagents met eigen model en tools; gestructureerde resultaten en een Agent Hub om werk te volgen en bij te sturen. [11] |

### Debugging en verificatie

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | Tests en checks via terminalopdrachten; aparte review van wijzigingen via `/review` of `codex review`. [7] |
| Claude Code | Tests via de shell; browsercontrole via Claude in Chrome, inclusief consolelogs, DOM en gebruikersflows. [8] |
| Copilot | Tests via agenttools; CLI-browserautomatisering via Playwright-MCP en een aparte code-reviewagent. [9] |
| Lurus Code | Debugmodus, testgeneratie en TDD-workflows; ingebouwde code-review en securityscans. Debugmodus is niet hetzelfde als een aangesloten debugger. [10] |
| omp | Ingebouwde DAP-debugger voor onder meer breakpoints, stepping en variabeleninspectie; daarnaast taalserverdiagnostiek en tests via de shell. [11] |

### Context- en sessiebeheer

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | Sessies hervatten met `resume`, vertakken met `fork` en context samenvatten met `/compact`. [7] |
| Claude Code | Sessies hervatten en kopiëren met `--resume` en `--fork-session`; automatische of handmatige compactie en blijvend projectgeheugen. [8] |
| Copilot | `/resume`, `/fork`, `/compact` en `/context`; sessiezijbalk voor wisselen tussen gesprekken. [9] |
| Lurus Code | Sessies hervatten, terugzoeken over projecten, context compacten en geheugen beheren; `/rewind chat` draait geen bestandswijzigingen terug. [10] |
| omp | Hervatten en vertakken, sessies uit Claude Code en Codex importeren, compactie en samenvattingen bij het wisselen van gesprekstak. [11] |

### Automatisering / headless

| Agent | Ondersteuning en verschil |
| --- | --- |
| Codex | `codex exec` voor scripts en CI, JSONL-events en hervatbare runs; SDK en app-server voor integraties. [7] |
| Claude Code | `claude -p`, JSON/streaming en schema-uitvoer; Agent SDK voor Python en TypeScript. [8] |
| Copilot | `copilot -p`, JSONL-uitvoer en `copilot workflow run` voor geregistreerde workflows. [9] |
| Lurus Code | Single prompts, batchbestanden, een langdurige `--pipe`-verbinding en aparte review-/securitycommando's voor CI; JSON-uitvoer is NDJSON. [10] |
| omp | `omp -p`, JSON-events, RPC en ACP; Bun-SDK voor directe aansturing van sessies en tools. [11] |

## 3. Tokens en kosten

Geen betrouwbaar gezamenlijk klassement voor snelheid, kwaliteit of tokenverbruik beschikbaar.

| Agent | Praktisch verschil |
| --- | --- |
| Codex | Context- en gebruiksinformatie beschikbaar. [6] |
| Claude Code | Kosteninzicht; skills, plugins en subagents kunnen extra verbruik meebrengen. [6] |
| Copilot | Tokengebaseerde AI Credits volgens de aangehaalde documentatie. [6] |
| Lurus Code | Toont tokens en kosten; providerprijzen, opslag en credits afzonderlijk vergelijken. [6] |
| omp | Samengevatte reads en programmeerbare toolcalls; cache warming kan extra achtergrondverzoeken veroorzaken. [6] |

## Bronnen

- **[1] Codex:** [Configuratie](https://learn.chatgpt.com/docs/config-file/config-reference.md) · [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) · [Hooks en pluginhooks](https://developers.openai.com/codex/hooks)
- **[2] Claude Code:** [Projectregels](https://code.claude.com/docs/en/memory.md) · [Uitbreidingen](https://code.claude.com/docs/en/features-overview.md) · [Plugins](https://code.claude.com/docs/en/plugins/overview) · [Hooks](https://code.claude.com/docs/en/hooks) · [Mods](https://code.claude.com/docs/en/plugins/mods/overview) · [Aankondiging mods](https://claude.com/resources/articles/claude-code-mods) · [Output styles](https://code.claude.com/docs/en/output-styles)
- **[3] Copilot:** [CLI](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) · [Instructies](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) · [Plugins](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-cli-plugins) · [Extensies](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-extensions) · [Hooks](https://docs.github.com/en/copilot/concepts/customizations/hooks)
- **[4] Lurus Code:** [Projectregels](https://code.lurus.ai/en/docs/rules-memory/) · [Custom agents](https://code.lurus.ai/en/docs/custom-agents/) · [Skills en pakketten](https://code.lurus.ai/en/docs/skills/) · [Hooks](https://code.lurus.ai/en/features/hooks/) · [MCP](https://code.lurus.ai/en/features/mcp/)
- **[5] omp:** [Prompts en persoonlijkheid](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/system-prompt-customization.md) · [Contextbestanden](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/context-files.md) · [Extensies en events](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/extensions.md)
- **[6] Tokens en kosten:** [Codex](https://learn.chatgpt.com/docs/developer-commands.md?surface=cli) · [Claude Code](https://code.claude.com/docs/en/costs.md) · [Copilot](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing) · [Lurus](https://code.lurus.ai/en/docs/models-costs/) · [omp](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/settings.md)
- **[7] Codex-workflows:** [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) · [CLI, review en sessies](https://learn.chatgpt.com/docs/developer-commands.md?surface=cli) · [SDK](https://learn.chatgpt.com/docs/codex-sdk.md) · [App-server](https://learn.chatgpt.com/docs/app-server.md)
- **[8] Claude Code-workflows:** [Subagents en dynamische workflows](https://code.claude.com/docs/en/features-overview.md) · [Chrome](https://code.claude.com/docs/en/chrome.md) · [Sessies](https://code.claude.com/docs/en/sessions.md) · [Contextbeheer](https://code.claude.com/docs/en/context-window.md) · [Headless en SDK](https://code.claude.com/docs/en/headless.md)
- **[9] Copilot-workflows:** [CLI-referentie: fleet, sessies, Playwright en programmatisch gebruik](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- **[10] Lurus Code-workflows:** [CLI-referentie: tests, context, orchestration en automatisering](https://code.lurus.ai/en/docs/cli-commands/) · [Custom-agentbeperkingen](https://code.lurus.ai/en/docs/custom-agents/)
- **[11] omp-workflows:** [Debugger en subagents](https://github.com/can1357/oh-my-pi/blob/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/README.md) · [CLI en sessies](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/cli-reference.md) · [Agentconfiguratie](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/task-agent-discovery.md) · [Compactie](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/compaction.md) · [SDK](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/sdk.md)
