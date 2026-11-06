// =====================================================================
// VISUALS · DEEL 4: DE AGENT STUREN EN UITBREIDEN
// bouwset (startpagina) · instructies · skill · mcpstekker · mcpserver
// hook · subagent · plugin · combineren · overzicht
//
// Elke bouwsteen heeft een eigen kleur (zie css/visuals.css, .k-...).
// Zo herken je hem overal in dit deel terug.
// =====================================================================


// ---------------------------------------------------------------------
// 1. Gedeeld: de zes bouwstenen
// ---------------------------------------------------------------------

// begrip = naar welk begrip je springt als je op de bouwsteen klikt
const BOUWSTENEN = [
  { id: 'instructies', begrip: 'instructies', icoon: 'file-text', naam: 'Projectinstructies', badge: 'Altijd geladen',
    wat: 'Vaste afspraken in een tekstbestand', voor: 'Regels die altijd gelden in dit project' },
  { id: 'skill', begrip: 'skill', icoon: 'book-open', naam: 'Skill', badge: 'Laadt als het nodig is',
    wat: 'Handleiding voor een soort taak', voor: 'Een werkwijze die je vaker nodig hebt' },
  { id: 'hook', begrip: 'hook', icoon: 'zap', naam: 'Hook', badge: 'Draait altijd',
    wat: 'Automatische actie op een vast moment', voor: 'Iets dat altijd moet gebeuren, zonder uitzondering' },
  { id: 'mcp', begrip: 'mcp', icoon: 'plug', naam: 'MCP-server', badge: 'Koppeling',
    wat: 'Koppeling met een ander systeem', voor: 'Toegang tot tickets, databases, websites' },
  { id: 'subagent', begrip: 'subagent', icoon: 'users', naam: 'Subagent', badge: 'Eigen context',
    wat: 'Hulpagent met een eigen context', voor: 'Een afgebakende deeltaak uitbesteden' },
  { id: 'plugin', begrip: 'plugin', icoon: 'package', naam: 'Plugin', badge: 'Pakket',
    wat: 'Installeerbaar pakket met bouwstenen', voor: 'Uitbreidingen delen en in één keer installeren' },
];

const bouwsteen = id => BOUWSTENEN.find(b => b.id === id);

// Het gekleurde icoontje van een bouwsteen
function steenIcoon(id) {
  return `<span class="k-icoon k-${id}">${icoon(bouwsteen(id).icoon)}</span>`;
}

// Wacht even (of niet, bij "minder beweging")
const uitbreidWacht = ms => new Promise(klaar => setTimeout(klaar, minderBeweging ? 0 : ms));


// ---------------------------------------------------------------------
// 2. De bouwset: de startpagina van dit deel
// Klik op een bouwsteen om naar zijn eigen uitleg te gaan.
// ---------------------------------------------------------------------
VISUALS.bouwset = {
  label: 'Klik op een bouwsteen', icoon: 'mouse-pointer-click',
  maak(el) {
    const tegel = id => {
      const b = bouwsteen(id);
      return `
        <button class="bs-tegel k-${id}" type="button" data-naar-begrip="${b.begrip}">
          ${steenIcoon(id)}<strong>${b.naam}</strong><small>${b.badge}</small>
        </button>`;
    };
    el.innerHTML = `
      <div class="bs-raster">
        ${tegel('instructies')}
        ${tegel('skill')}
        ${tegel('hook')}
        ${tegel('mcp')}
        <div class="bs-agent" aria-hidden="true">${icoon('bot')}<strong>Agent</strong></div>
        ${tegel('subagent')}
        <button class="bs-tegel bs-plugin k-plugin" type="button" data-naar-begrip="plugin">
          ${steenIcoon('plugin')}
          <span><strong>Plugin</strong><small>Bundelt bouwstenen in één pakket</small></span>
          <span class="bs-inhoud" aria-hidden="true">${steenIcoon('skill')}${steenIcoon('hook')}${steenIcoon('mcp')}${steenIcoon('subagent')}</span>
        </button>
      </div>
      <div class="bs-verder">
        <button class="bs-verder-knop" type="button" data-naar-begrip="combineren">
          ${icoon('link')}<span><strong>Ze werken samen</strong><small>Een instructie kan naar een skill verwijzen, een skill naar een MCP-server, ...</small></span>${icoon('arrow-right')}
        </button>
        <button class="bs-verder-knop" type="button" data-naar-begrip="overzicht">
          ${icoon('circle-help')}<span><strong>Wat kies ik wanneer?</strong><small>Test jezelf met een paar situaties</small></span>${icoon('arrow-right')}
        </button>
      </div>`;
  },
};


// ---------------------------------------------------------------------
// 3. Projectinstructies: zonder bestand herhaal je jezelf elke sessie
// ---------------------------------------------------------------------
const PI_REGELS = ['Schrijf code in het Engels.', 'Test altijd met <code>npm test</code>.', 'Leg kort uit wat je wijzigde.'];
const PI_HERHAALD = 'Schrijf in het Engels, test met npm test en leg uit wat je wijzigde.';
const PI_SESSIES = [
  { dag: 'Maandag', taak: 'Voeg een filter toe.' },
  { dag: 'Dinsdag', taak: 'Herstel de zoekfout.' },
  { dag: 'Woensdag', taak: 'Maak een exportknop.' },
];

VISUALS.instructies = {
  label: 'Probeer het: zet het bestand in de projectmap', icoon: 'mouse-pointer-click',
  maak(el) {
    let metBestand = false;

    el.innerHTML = `
      <div class="pi-wrap">
        <div class="pi-links">
          <button class="schakelaar" type="button" role="switch" aria-checked="false">
            <span class="baan-s"></span>AGENTS.md in de projectmap
          </button>
          <div class="pi-map">
            <div class="pi-rij">${icoon('folder-open')}klantenportaal/</div>
            <div class="pi-rij in">${icoon('folder')}src/</div>
            <div class="pi-rij in">${icoon('file')}package.json</div>
            <div class="pi-bestand in k-instructies" hidden>
              <div class="pi-rij">${steenIcoon('instructies')}<strong>AGENTS.md</strong></div>
              <ul>${PI_REGELS.map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
          </div>
          <p class="noot">Claude Code leest <code>CLAUDE.md</code>, Codex en veel andere agents <code>AGENTS.md</code>.</p>
        </div>
        <div class="pi-rechts">
          <div class="pi-sessies"></div>
          <div class="pi-teller"><small>Zelf getypt deze week</small><strong></strong></div>
        </div>
      </div>
      <p class="status pi-status"></p>`;

    const schakelaar = el.querySelector('.schakelaar');

    function teken() {
      schakelaar.setAttribute('aria-checked', String(metBestand));
      const bestand = el.querySelector('.pi-bestand');
      bestand.hidden = !metBestand;
      if (metBestand) herstartAnimatie(bestand, 'nieuw');

      // Drie sessies: elke sessie begint met een lege context
      el.querySelector('.pi-sessies').innerHTML = PI_SESSIES.map((s, i) => `
        <div class="pi-sessie" style="--i:${i}">
          <p class="eyebrow">${s.dag} · nieuwe sessie</p>
          ${metBestand ? `<span class="pi-ingelezen">${icoon('file-text')}AGENTS.md ingelezen</span>` : ''}
          <p class="pi-bericht">${s.taak}${metBestand ? '' : ` <mark>${PI_HERHAALD}</mark>`}</p>
        </div>`).join('');

      // Hoeveel woorden typte je zelf?
      const woorden = tekst => tekst.split(/\s+/).filter(Boolean).length;
      const totaal = PI_SESSIES.reduce((som, s) => som + woorden(s.taak) + (metBestand ? 0 : woorden(PI_HERHAALD)), 0);
      el.querySelector('.pi-teller strong').textContent = `${totaal} woorden`;

      const status = el.querySelector('.pi-status');
      status.className = 'status pi-status ' + (metBestand ? 'ok' : 'let-op');
      status.innerHTML = metBestand
        ? `${icoon('sparkles')}<span>De agent leest het bestand bij de start van elke sessie. Jij typt alleen nog de taak.</span>`
        : `${icoon('repeat')}<span>Elke sessie begint leeg. Dus typ je telkens opnieuw dezelfde regels.</span>`;
      tekenIconen();
    }

    schakelaar.addEventListener('click', () => { metBestand = !metBestand; teken(); });
    teken();
  },
};


// ---------------------------------------------------------------------
// 4. Skill: de agent kent eerst alleen naam en beschrijving.
// De volledige handleiding gaat pas open als je vraag erbij past.
// ---------------------------------------------------------------------
const SKILLS = [
  { id: 'presentatie', naam: 'presentatie-maken', beschrijving: 'Maakt een presentatie in de huisstijl.', grootte: 4,
    stappen: ['Gebruik het sjabloon <code>huisstijl.pptx</code>.', 'Maximaal 6 dia’s, één boodschap per dia.', 'Zet het logo rechtsonder.'] },
  { id: 'incident', naam: 'incident-afhandelen', beschrijving: 'Handelt een incidentticket af.', grootte: 3,
    stappen: ['Lees het ticket.', 'Bepaal de impact: hoog, middel of laag.', 'Schrijf een conceptnotitie voor de melder.'] },
  { id: 'excel', naam: 'excel-verwerken', beschrijving: 'Leest en bewerkt Excel-bestanden.', grootte: 5,
    stappen: ['Lees het bestand met het hulpscript <code>lees_excel.py</code>.', 'Controleer op lege rijen.', 'Bewaar het resultaat als nieuw bestand.'] },
];
const SKILL_VRAGEN = [
  { tekst: 'Maak een presentatie over de nieuwe zoekfunctie', skill: 'presentatie' },
  { tekst: 'Handel incident 456 af', skill: 'incident' },
  { tekst: 'Wat doet <code>const</code> in JavaScript?', skill: null },
];
const SKILL_BESCHRIJVING_K = 0.1;   // een naam + beschrijving kost ongeveer 0,1k tokens

VISUALS.skill = {
  label: 'Probeer het: stel een vraag en kijk welke skill opengaat', icoon: 'mouse-pointer-click',
  maak(el) {
    el.innerHTML = `
      <div class="sk-vragen" role="group" aria-label="Kies een vraag">
        ${SKILL_VRAGEN.map((v, i) => `<button class="chip" type="button" data-vraag="${i}" aria-pressed="false">${icoon('message-square')}${v.tekst}</button>`).join('')}
      </div>
      <div class="sk-plank">
        ${SKILLS.map(s => `
          <div class="sk-kaart" data-skill="${s.id}">
            <div class="sk-kop">
              <span class="sk-boek">${icoon('book')}</span>
              <div><code>${s.naam}</code><small>${s.beschrijving}</small></div>
            </div>
            <ol class="sk-stappen" hidden>${s.stappen.map(st => `<li>${st}</li>`).join('')}</ol>
          </div>`).join('')}
      </div>
      <div class="sk-context">
        <p class="eyebrow">${icoon('layers')}In de context</p>
        <div class="sk-balk"><span class="sk-kort"></span><span class="sk-vol"></span></div>
        <p class="sk-cijfers noot"></p>
      </div>
      <p class="status sk-status"></p>`;

    function kies(index) {
      const vraag = index === null ? null : SKILL_VRAGEN[index];
      const open = vraag ? SKILLS.find(s => s.id === vraag.skill) : null;

      el.querySelectorAll('[data-vraag]').forEach(k => k.setAttribute('aria-pressed', String(Number(k.dataset.vraag) === index)));

      // Alleen de passende skill gaat open
      el.querySelectorAll('.sk-kaart').forEach(kaart => {
        const isOpen = open && kaart.dataset.skill === open.id;
        kaart.classList.toggle('open', Boolean(isOpen));
        kaart.querySelector('.sk-boek').innerHTML = icoon(isOpen ? 'book-open' : 'book');
        const stappen = kaart.querySelector('.sk-stappen');
        stappen.hidden = !isOpen;
        if (isOpen) herstartAnimatie(stappen, 'nieuw');
      });

      // De contextbalk: beschrijvingen altijd, de handleiding alleen als ze open is
      const kort = SKILLS.length * SKILL_BESCHRIJVING_K;
      const vol = open ? open.grootte : 0;
      const schaal = 6;   // de balk is 6k breed
      el.querySelector('.sk-kort').style.width = `${(kort / schaal) * 100}%`;
      el.querySelector('.sk-vol').style.width = `${(vol / schaal) * 100}%`;
      el.querySelector('.sk-cijfers').innerHTML = `${SKILLS.length} beschrijvingen: ${kort.toFixed(1).replace('.', ',')}k tokens`
        + (open ? ` · <strong>+ handleiding ${open.naam}: ${open.grootte}k</strong>` : '');

      const status = el.querySelector('.sk-status');
      if (!vraag) {
        status.className = 'status sk-status';
        status.innerHTML = `${icoon('book')}<span>Van elke skill kent de agent nu alleen de naam en de beschrijving. Kies een vraag.</span>`;
      } else if (open) {
        status.className = 'status sk-status ok';
        status.innerHTML = `${icoon('book-open')}<span>De vraag past bij de beschrijving van <code>${open.naam}</code>. Pas nu laadt de agent de volledige handleiding.</span>`;
      } else {
        status.className = 'status sk-status';
        status.innerHTML = `${icoon('book')}<span>Geen skill past bij deze vraag. Alle handleidingen blijven dicht en kosten niets extra.</span>`;
      }
      tekenIconen();
    }

    el.addEventListener('click', e => {
      const knop = e.target.closest('[data-vraag]');
      if (knop) kies(Number(knop.dataset.vraag));
    });
    kies(null);
  },
};


// ---------------------------------------------------------------------
// 5. MCP: één standaardstekker in plaats van een kluwen aan koppelingen
// ---------------------------------------------------------------------
const MCP_AGENTS = [
  { naam: 'Claude Code', icoon: 'square-terminal' },
  { naam: 'Codex', icoon: 'square-terminal' },
  { naam: 'omp', icoon: 'square-terminal' },
];
const MCP_SYSTEMEN = [
  { naam: 'Ticketsysteem', icoon: 'ticket' },
  { naam: 'GitHub', icoon: 'git-branch' },
  { naam: 'Database', icoon: 'database' },
];
const MCP_EXTRA_SYSTEEM = { naam: 'Agenda', icoon: 'calendar' };
const MCP_KLEUREN = ['var(--accent)', 'var(--warn)', 'var(--deep-ink)'];

VISUALS.mcpstekker = {
  label: 'Probeer het: koppel agents aan systemen', icoon: 'mouse-pointer-click',
  maak(el) {
    let metMcp = false;
    let extraSysteem = false;

    el.innerHTML = `
      <div class="knoppen mcp-bediening">
        <div class="segment" role="group" aria-label="Zonder of met MCP">
          <button type="button" data-mcp="nee">Zonder MCP</button>
          <button type="button" data-mcp="ja">Met MCP</button>
        </div>
        <button class="knop" type="button" data-extra>${icoon('plus')}Systeem erbij</button>
      </div>
      <div class="mcp-schema">
        <ul class="mcp-kolom mcp-agents"></ul>
        <div class="mcp-midden">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>
          <span class="mcp-stekker">${icoon('plug')}MCP</span>
        </div>
        <ul class="mcp-kolom mcp-systemen"></ul>
      </div>
      <div class="lab-tegels twee mcp-tegels">
        <div class="tegel"><small class="mcp-teller-label"></small><strong class="mcp-teller"></strong></div>
        <div class="tegel"><small>Elke agent praat met elk systeem</small><strong>${icoon('arrow-left-right')}</strong></div>
      </div>
      <p class="status mcp-status"></p>`;

    const kolomItem = (item, i) => `<li class="mcp-item" style="--i:${i}">${icoon(item.icoon)}<span>${item.naam}</span></li>`;

    // Een gebogen lijn van (x1, y1) naar (x2, y2) in het SVG-vlak van 100 × 100
    const lijn = (x1, y1, x2, y2, kleur, i) => {
      const mx = (x1 + x2) / 2;
      return `<path d="M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" stroke="${kleur}" style="--i:${i}" />`;
    };

    function teken() {
      const systemen = extraSysteem ? [...MCP_SYSTEMEN, MCP_EXTRA_SYSTEEM] : MCP_SYSTEMEN;
      // De middelpunten van de items: verdeeld zoals flex "space-around"
      const hoogte = (i, aantal) => ((i + 0.5) / aantal) * 100;

      el.querySelectorAll('[data-mcp]').forEach(k => k.setAttribute('aria-pressed', String((k.dataset.mcp === 'ja') === metMcp)));
      el.querySelector('[data-extra]').innerHTML = extraSysteem ? `${icoon('minus')}Systeem eraf` : `${icoon('plus')}Systeem erbij`;
      el.querySelector('.mcp-agents').innerHTML = MCP_AGENTS.map(kolomItem).join('');
      el.querySelector('.mcp-systemen').innerHTML = systemen.map((s, i) =>
        kolomItem(s, i).replace('</li>', metMcp ? `<small class="mcp-server-label">${icoon('server')}MCP-server</small></li>` : '</li>')).join('');

      // De lijnen
      let paden = '';
      let teller = 0;
      if (metMcp) {
        MCP_AGENTS.forEach((a, i) => { paden += lijn(0, hoogte(i, MCP_AGENTS.length), 50, 50, 'var(--k-mcp)', teller++); });
        systemen.forEach((s, j) => { paden += lijn(50, 50, 100, hoogte(j, systemen.length), 'var(--k-mcp)', teller++); });
      } else {
        MCP_AGENTS.forEach((a, i) => systemen.forEach((s, j) => {
          paden += lijn(0, hoogte(i, MCP_AGENTS.length), 100, hoogte(j, systemen.length), MCP_KLEUREN[i], teller++);
        }));
      }
      el.querySelector('.mcp-midden svg').innerHTML = paden;
      el.querySelector('.mcp-schema').classList.toggle('met-mcp', metMcp);

      // Tellers en uitleg
      const aantal = metMcp ? systemen.length : MCP_AGENTS.length * systemen.length;
      el.querySelector('.mcp-teller-label').textContent = metMcp ? 'MCP-servers om te bouwen' : 'Aparte koppelingen om te bouwen';
      el.querySelector('.mcp-teller').textContent = aantal;
      const status = el.querySelector('.mcp-status');
      status.className = 'status mcp-status ' + (metMcp ? 'ok' : 'let-op');
      status.innerHTML = metMcp
        ? `${icoon('plug')}<span>Elk systeem krijgt één MCP-server. Elke agent die MCP kent, kan die gebruiken, zoals elke laptop met een USB-stick werkt.</span>`
        : `${icoon('cable')}<span>Zonder standaard bouw je voor elke agent een eigen koppeling met elk systeem. Bij elk nieuw systeem komen er ${MCP_AGENTS.length} bij.</span>`;
      tekenIconen();
    }

    el.addEventListener('click', e => {
      const keuze = e.target.closest('[data-mcp]');
      if (keuze) { metMcp = keuze.dataset.mcp === 'ja'; teken(); }
      if (e.target.closest('[data-extra]')) { extraSysteem = !extraSysteem; teken(); }
    });
    teken();
  },
};


// ---------------------------------------------------------------------
// 6. MCP-server: klik op een tool en volg het bericht heen en terug
// ---------------------------------------------------------------------
const MCP_TOOLS = [
  { naam: 'ticket_lezen', icoon: 'ticket',
    aanroep: 'ticket_lezen({ "nummer": 456 })',
    vraag: 'vraagt ticket 456 op',
    antwoord: '{ "titel": "Printer werkt niet", "status": "open" }' },
  { naam: 'tickets_zoeken', icoon: 'search',
    aanroep: 'tickets_zoeken({ "zoekterm": "printer" })',
    vraag: 'zoekt tickets met “printer”',
    antwoord: '[ 456, 461 ]' },
  { naam: 'notitie_toevoegen', icoon: 'notebook-pen',
    aanroep: 'notitie_toevoegen({ "nummer": 456, "tekst": "Printer herstart." })',
    vraag: 'zet een notitie bij ticket 456',
    antwoord: '{ "gelukt": true }' },
];
const MCP_PLEKKEN = {
  lokaal: { icoon: 'laptop', label: 'Op jouw computer', transport: 'stdio' },
  online: { icoon: 'cloud', label: 'Online, via een URL', transport: 'HTTP' },
};

VISUALS.mcpserver = {
  label: 'Probeer het: klik op een tool van de server', icoon: 'mouse-pointer-click',
  maak(el) {
    let plek = 'lokaal';

    el.innerHTML = `
      <div class="knoppen">
        <div class="segment" role="group" aria-label="Waar draait de server?">
          <button type="button" data-plek="lokaal">${icoon('laptop')}Op jouw computer</button>
          <button type="button" data-plek="online">${icoon('cloud')}Online</button>
        </div>
      </div>
      <div class="ms-baan">
        <div class="ms-station">${icoon('bot')}<strong>Agent</strong></div>
        <span class="ms-draad"><small class="ms-transport"></small></span>
        <div class="ms-station ms-server k-mcp">
          <span class="ms-plek"></span>
          <strong>Xurrent-MCP-server</strong>
          <div class="ms-tools">
            ${MCP_TOOLS.map((t, i) => `<button class="chip" type="button" data-tool="${i}" aria-pressed="false">${icoon(t.icoon)}<code>${t.naam}</code></button>`).join('')}
          </div>
        </div>
        <span class="ms-draad"><small>API</small></span>
        <div class="ms-station">${icoon('ticket')}<strong>Xurrent</strong></div>
      </div>
      <ol class="ms-log" aria-live="polite"></ol>`;

    function tekenPlek() {
      const p = MCP_PLEKKEN[plek];
      el.querySelectorAll('[data-plek]').forEach(k => k.setAttribute('aria-pressed', String(k.dataset.plek === plek)));
      el.querySelector('.ms-plek').innerHTML = `${icoon(p.icoon)}${p.label}`;
      el.querySelector('.ms-transport').textContent = p.transport;
      tekenIconen();
    }

    function kiesTool(index) {
      const t = MCP_TOOLS[index];
      el.querySelectorAll('[data-tool]').forEach(k => k.setAttribute('aria-pressed', String(Number(k.dataset.tool) === index)));
      const stap = (van, naar, inhoud, i, code) => `
        <li style="--i:${i}">
          <span class="ms-wie">${icoon(van)}${icoon('arrow-right')}${icoon(naar)}</span>
          ${code ? `<code>${inhoud}</code>` : `<span>${inhoud}</span>`}
        </li>`;
      el.querySelector('.ms-log').innerHTML = [
        stap('bot', 'server', t.aanroep, 0, true),
        stap('server', 'ticket', `De server ${t.vraag} bij Xurrent`, 1, false),
        stap('ticket', 'server', t.antwoord, 2, true),
        stap('server', 'bot', 'Toolresultaat terug naar de agent', 3, false),
      ].join('');
      tekenIconen();
    }

    el.addEventListener('click', e => {
      const p = e.target.closest('[data-plek]');
      if (p) { plek = p.dataset.plek; tekenPlek(); }
      const t = e.target.closest('[data-tool]');
      if (t) kiesTool(Number(t.dataset.tool));
    });
    tekenPlek();
    el.querySelector('.ms-log').innerHTML = `<li class="ms-leeg">${icoon('mouse-pointer-click')}<span>Bij de start vraagt de agent welke tools de server heeft. Klik er een aan.</span></li>`;
    tekenIconen();
  },
};


// ---------------------------------------------------------------------
// 7. Hook: een instructie kan het model vergeten, een hook niet
// ---------------------------------------------------------------------
const HOOK_WIJZIGINGEN = ['zoekfunctie.ts', 'lijst.ts', 'filter.ts', 'export.ts', 'api.ts'];
const HOOK_VERGETEN = 3;   // bij de instructie vergeet het model de 4de keer

VISUALS.hook = {
  label: 'Probeer het: instructie of hook?', icoon: 'mouse-pointer-click',
  maak(el) {
    let alsHook = false;
    let bezig = false;

    el.innerHTML = `
      <div class="knoppen">
        <div class="segment" role="group" aria-label="Instructie of hook">
          <button type="button" data-hook="nee">${icoon('file-text')}Als instructie</button>
          <button type="button" data-hook="ja">${icoon('zap')}Als hook</button>
        </div>
        <button class="knop primair" type="button" data-start>${icoon('play')}Laat de agent werken</button>
      </div>
      <div class="hk-regel"></div>
      <ol class="hk-lijn"></ol>
      <p class="status hk-status" hidden></p>`;

    function tekenRegel() {
      el.querySelectorAll('[data-hook]').forEach(k => k.setAttribute('aria-pressed', String((k.dataset.hook === 'ja') === alsHook)));
      el.querySelector('.hk-regel').innerHTML = alsHook
        ? `${steenIcoon('hook')}<div><small>Hook · na elke bestandswijziging</small><code>prettier --write &lt;bestand&gt;</code></div>`
        : `${steenIcoon('instructies')}<div><small>In AGENTS.md</small><span>“Maak de code netjes op na elke wijziging.”</span></div>`;
      el.querySelector('.hk-lijn').innerHTML = '';
      el.querySelector('.hk-status').hidden = true;
      tekenIconen();
    }

    async function werk() {
      if (bezig) return;
      bezig = true;
      el.querySelector('[data-start]').disabled = true;
      const lijst = el.querySelector('.hk-lijn');
      lijst.innerHTML = '';
      el.querySelector('.hk-status').hidden = true;

      let opgemaakt = 0;
      for (const [i, bestand] of HOOK_WIJZIGINGEN.entries()) {
        const vergeten = !alsHook && i === HOOK_VERGETEN;
        if (!vergeten) opgemaakt++;
        const gevolg = alsHook
          ? `<span class="hk-gevolg hook">${icoon('zap')}hook: opgemaakt</span>`
          : vergeten
            ? `<span class="hk-gevolg vergeten">${icoon('circle-dashed')}vergeten</span>`
            : `<span class="hk-gevolg ok">${icoon('sparkles')}opgemaakt</span>`;
        lijst.insertAdjacentHTML('beforeend', `<li>${icoon('pencil')}<span>Wijzigt <code>${bestand}</code></span>${gevolg}</li>`);
        tekenIconen();
        await uitbreidWacht(450);
      }

      const status = el.querySelector('.hk-status');
      status.hidden = false;
      status.className = 'status hk-status ' + (alsHook ? 'ok' : 'let-op');
      status.innerHTML = alsHook
        ? `${icoon('zap')}<span>${opgemaakt} van ${HOOK_WIJZIGINGEN.length} opgemaakt. De hook draait elke keer, automatisch. Het model komt er niet aan te pas.</span>`
        : `${icoon('triangle-alert')}<span>${opgemaakt} van ${HOOK_WIJZIGINGEN.length} opgemaakt. Een instructie volgt het model meestal, maar niet altijd.</span>`;
      herstartAnimatie(status, 'nieuw');
      tekenIconen();
      el.querySelector('[data-start]').disabled = false;
      bezig = false;
    }

    el.addEventListener('click', e => {
      const keuze = e.target.closest('[data-hook]');
      if (keuze && !bezig) { alsHook = keuze.dataset.hook === 'ja'; tekenRegel(); }
      if (e.target.closest('[data-start]')) werk();
    });
    tekenRegel();
  },
};


// ---------------------------------------------------------------------
// 8. Subagent: het zoekwerk gebeurt in een aparte context
// ---------------------------------------------------------------------
const SA_BESTANDEN = ['zoek.ts', 'lijst.ts', 'api.ts', 'filter.ts', 'export.ts', 'tabel.ts', 'menu.ts', 'test.ts'];
const SA_PER_BESTAND = 12;    // k-tokens per gelezen bestand
const SA_START = 10;          // k-tokens: jullie gesprek tot nu toe
const SA_ANTWOORD = 'Gebruikt in zoek.ts, lijst.ts en api.ts';
const SA_VENSTER = 200;       // k-tokens

VISUALS.subagent = {
  label: 'Probeer het: wie doet het zoekwerk?', icoon: 'mouse-pointer-click',
  maak(el) {
    let metSub = false;
    let bezig = false;

    el.innerHTML = `
      <p class="sa-vraag">${icoon('user-round')}<span>“Waar wordt de zoekfunctie overal gebruikt?”</span></p>
      <div class="knoppen">
        <div class="segment" role="group" aria-label="Wie zoekt?">
          <button type="button" data-sub="nee">${icoon('bot')}Hoofdagent zoekt zelf</button>
          <button type="button" data-sub="ja">${icoon('users')}Met subagent</button>
        </div>
        <button class="knop primair" type="button" data-start>${icoon('play')}Start</button>
      </div>
      <div class="sa-vensters">
        <div class="sa-venster" data-wie="hoofd">
          <div class="sa-kop">${icoon('bot')}<strong>Hoofdagent</strong><span class="sa-procent"></span></div>
          <div class="sa-meter"><span></span></div>
          <ul class="sa-inhoud"></ul>
        </div>
        <div class="sa-venster sub k-subagent" data-wie="sub">
          <div class="sa-kop">${icoon('users')}<strong>Subagent · eigen context</strong><span class="sa-procent"></span></div>
          <div class="sa-meter"><span></span></div>
          <ul class="sa-inhoud"></ul>
        </div>
      </div>
      <p class="status sa-status" hidden></p>`;

    const venster = wie => el.querySelector(`.sa-venster[data-wie="${wie}"]`);

    function zetMeter(wie, k) {
      const procent = Math.round((k / SA_VENSTER) * 100);
      venster(wie).querySelector('.sa-meter span').style.width = `${procent}%`;
      venster(wie).querySelector('.sa-procent').textContent = `${procent}% vol`;
    }

    function voegToe(wie, html, klasse = '') {
      venster(wie).querySelector('.sa-inhoud').insertAdjacentHTML('beforeend', `<li class="${klasse}">${html}</li>`);
      tekenIconen();
    }

    function beginToestand() {
      el.querySelectorAll('[data-sub]').forEach(k => k.setAttribute('aria-pressed', String((k.dataset.sub === 'ja') === metSub)));
      venster('sub').hidden = !metSub;
      ['hoofd', 'sub'].forEach(wie => { venster(wie).querySelector('.sa-inhoud').innerHTML = ''; });
      voegToe('hoofd', `${icoon('message-square')}Jullie gesprek`, 'gesprek');
      zetMeter('hoofd', SA_START);
      zetMeter('sub', 0);
      el.querySelector('.sa-status').hidden = true;
      tekenIconen();
    }

    async function start() {
      if (bezig) return;
      bezig = true;
      el.querySelector('[data-start]').disabled = true;
      beginToestand();

      // Wie leest de bestanden in?
      const lezer = metSub ? 'sub' : 'hoofd';
      let gelezen = metSub ? 0 : SA_START;
      for (const bestand of SA_BESTANDEN) {
        gelezen += SA_PER_BESTAND;
        voegToe(lezer, `${icoon('file-text')}${bestand}`, 'nieuw');
        zetMeter(lezer, gelezen);
        await uitbreidWacht(220);
      }

      // Met subagent: alleen het korte antwoord gaat terug naar de hoofdagent
      if (metSub) {
        await uitbreidWacht(300);
        voegToe('hoofd', `${icoon('corner-down-left')}${SA_ANTWOORD}`, 'antwoord nieuw');
        zetMeter('hoofd', SA_START + 0.4);
      }

      const status = el.querySelector('.sa-status');
      status.hidden = false;
      status.className = 'status sa-status ' + (metSub ? 'ok' : 'let-op');
      status.innerHTML = metSub
        ? `${icoon('users')}<span>De subagent las ${SA_BESTANDEN.length} bestanden in zijn eigen context. De hoofdagent krijgt alleen het antwoord en blijft scherp.</span>`
        : `${icoon('triangle-alert')}<span>Alle ${SA_BESTANDEN.length} bestanden zitten nu in de context van de hoofdagent, ook al heeft die er maar één zin van nodig.</span>`;
      herstartAnimatie(status, 'nieuw');
      tekenIconen();
      el.querySelector('[data-start]').disabled = false;
      bezig = false;
    }

    el.addEventListener('click', e => {
      const keuze = e.target.closest('[data-sub]');
      if (keuze && !bezig) { metSub = keuze.dataset.sub === 'ja'; beginToestand(); }
      if (e.target.closest('[data-start]')) start();
    });
    beginToestand();
  },
};


// ---------------------------------------------------------------------
// 9. Plugin en extension: per product een pakket, of code
// Claude Code, Codex en Copilot: een plugin is een pakket met bouwstenen.
// omp: een extension is code die in de agent meedraait.
// Een onderdeel is ofwel een bouwsteen (steen), ofwel iets anders (icoon + soort).
// ---------------------------------------------------------------------
const PLUGIN_PRODUCTEN = {
  claude: {
    knop: 'Claude Code', vorm: 'pakket', naam: 'review-plugin',
    inhoud: [
      { steen: 'skill', naam: 'code-review' },
      { steen: 'subagent', naam: 'reviewer' },
      { steen: 'hook', naam: 'opmaak na elke wijziging' },
      { steen: 'mcp', naam: 'GitHub-MCP-server' },
    ],
    klaar: 'Eén installatie, vier bouwstenen. Een Claude Code-plugin kan ook commando’s, LSP-servers en eigen scripts bevatten.',
  },
  codex: {
    knop: 'Codex', vorm: 'pakket', naam: 'review-plugin',
    inhoud: [
      { steen: 'skill', naam: 'code-review' },
      { steen: 'hook', naam: 'opmaak na elke wijziging' },
      { steen: 'mcp', naam: 'GitHub-MCP-server' },
      { icoon: 'globe', soort: 'Browserextensie', naam: 'pagina’s bekijken' },
    ],
    klaar: 'Eén installatie, vier onderdelen. Een Codex-plugin bundelt skills, MCP-servers, hooks en browserextensies. Plugins werken in de Codex-app en de CLI, niet in de IDE-extension.',
  },
  copilot: {
    knop: 'Copilot', vorm: 'pakket', naam: 'review-plugin',
    inhoud: [
      { steen: 'skill', naam: 'code-review' },
      { steen: 'subagent', naam: 'reviewer (custom agent)' },
      { steen: 'hook', naam: 'opmaak na elke wijziging' },
      { steen: 'mcp', naam: 'GitHub-MCP-server' },
      { icoon: 'code', soort: 'Extension (code)', naam: 'eigen tool en /commando' },
    ],
    klaar: 'Eén installatie, vijf onderdelen. Een Copilot-plugin werkt in VS Code, Copilot CLI, de Copilot-app en Copilot in de cloud. Sommige onderdelen werken maar op één plek.',
  },
  omp: {
    knop: 'omp', vorm: 'code', naam: 'review.ts',
    code: [
      '// vereenvoudigd voorbeeld',
      'export default function (pi) {',
      '  pi.registerTool({ name: "ticket_lezen", … });',
      '  pi.registerCommand("review", …);',
      '  pi.on("tool_call", blokkeerGevaarlijk);',
      '  pi.on("session_start", toonWelkom);',
      '}',
    ],
    inhoud: [
      { icoon: 'wrench', soort: 'Nieuwe tool', naam: '<code>ticket_lezen</code>' },
      { icoon: 'square-terminal', soort: 'Nieuw commando', naam: '<code>/review</code>' },
      { icoon: 'zap', soort: 'Reageert op gebeurtenissen', naam: 'blokkeert gevaarlijke commando’s' },
      { icoon: 'app-window', soort: 'Eigen scherm', naam: 'meldingen en knoppen' },
    ],
    klaar: 'Een omp-extension is geen pakket tekstbestanden, maar een programma dat in de agent meedraait, zonder afscherming. Installeer dus alleen extensions die je vertrouwt.',
  },
};

VISUALS.plugin = {
  label: 'Probeer het: kies een product en installeer', icoon: 'mouse-pointer-click',
  maak(el) {
    let product = 'claude';
    let bezig = false;

    el.innerHTML = `
      <div class="knoppen pl-bediening">
        <div class="segment" role="group" aria-label="Kies een product">
          ${Object.entries(PLUGIN_PRODUCTEN).map(([id, p]) => `<button type="button" data-product="${id}">${p.knop}</button>`).join('')}
        </div>
      </div>
      <div class="pl">
        <div class="pl-links"></div>
        <span class="pl-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <div class="pl-agent">
          <div class="pl-kop">${icoon('bot')}<strong class="pl-agentnaam"></strong></div>
          <ul class="pl-plekken"></ul>
        </div>
      </div>
      <p class="status pl-status"></p>`;

    // Een onderdeel: een gekleurde bouwsteen, of een ander icoon in "code"-kleur
    const onderdeelIcoon = d => d.steen ? steenIcoon(d.steen) : `<span class="k-icoon k-code">${icoon(d.icoon)}</span>`;
    const onderdeelSoort = d => d.steen ? bouwsteen(d.steen).naam : d.soort;

    function teken() {
      const p = PLUGIN_PRODUCTEN[product];
      el.querySelectorAll('[data-product]').forEach(k => k.setAttribute('aria-pressed', String(k.dataset.product === product)));

      // Links: het pakket (een doos met onderdelen) of de code
      el.querySelector('.pl-links').innerHTML = p.vorm === 'pakket'
        ? `
          <div class="pl-pakket k-plugin">
            <div class="pl-pakket-kop"><span class="pl-doos">${icoon('package')}</span><div><small>Plugin · een pakket</small><strong><code>${p.naam}</code></strong></div></div>
            <ul class="pl-lijst">${p.inhoud.map(d => `<li>${onderdeelIcoon(d)}<span><small>${onderdeelSoort(d)}</small>${d.naam}</span></li>`).join('')}</ul>
            <button class="knop primair" type="button" data-installeer>${icoon('download')}Installeer de plugin</button>
          </div>`
        : `
          <div class="pl-code k-code">
            <div class="pl-pakket-kop"><span class="pl-doos">${icoon('file-code')}</span><div><small>Extension · code</small><strong><code>${p.naam}</code></strong></div></div>
            <pre>${p.code.join('\n')}</pre>
            <button class="knop primair" type="button" data-installeer>${icoon('play')}Laad de extension</button>
          </div>`;

      // Rechts: de agent met lege plekken
      el.querySelector('.pl-agentnaam').textContent = p.knop;
      el.querySelector('.pl-plekken').innerHTML = p.inhoud.map((d, i) => `
        <li class="pl-plek" data-plek="${i}"><span class="pl-leeg">${icoon('plus')}${onderdeelSoort(d)}</span></li>`).join('');

      const status = el.querySelector('.pl-status');
      status.className = 'status pl-status';
      status.innerHTML = p.vorm === 'pakket'
        ? `${icoon('package')}<span>Een plugin is een pakket: alle onderdelen zitten er kant-en-klaar in. Zonder plugin stel je ze elk apart in.</span>`
        : `${icoon('file-code')}<span>In omp heet het een extension: geen pakket, maar TypeScript-code die de agent zelf uitbreidt.</span>`;
      tekenIconen();
    }

    async function installeer() {
      if (bezig) return;
      bezig = true;
      const p = PLUGIN_PRODUCTEN[product];
      const knop = el.querySelector('[data-installeer]');
      knop.disabled = true;
      const links = el.querySelector('.pl-pakket, .pl-code');
      links.classList.add('open');
      if (p.vorm === 'pakket') el.querySelector('.pl-doos').innerHTML = icoon('package-open');
      tekenIconen();

      // De onderdelen komen één voor één aan bij de agent
      for (const [i, deel] of p.inhoud.entries()) {
        await uitbreidWacht(300);
        const plek = el.querySelector(`.pl-plek[data-plek="${i}"]`);
        if (!plek) break;   // intussen een ander product gekozen
        plek.classList.add('vol');
        plek.innerHTML = `${onderdeelIcoon(deel)}<span><small>${onderdeelSoort(deel)}</small>${deel.naam}</span>`;
        herstartAnimatie(plek, 'nieuw');
        tekenIconen();
      }

      const status = el.querySelector('.pl-status');
      status.className = 'status pl-status ' + (p.vorm === 'pakket' ? 'ok' : 'let-op');
      status.innerHTML = `${icoon(p.vorm === 'pakket' ? 'party-popper' : 'triangle-alert')}<span>${p.klaar}</span>`;
      herstartAnimatie(status, 'nieuw');
      knop.innerHTML = `${icoon('rotate-ccw')}Opnieuw`;
      knop.disabled = false;
      knop.dataset.opnieuw = '';
      tekenIconen();
      bezig = false;
    }

    el.addEventListener('click', e => {
      const keuze = e.target.closest('[data-product]');
      if (keuze && !bezig) { product = keuze.dataset.product; teken(); }
      const knop = e.target.closest('[data-installeer]');
      if (knop) {
        if ('opnieuw' in knop.dataset) teken();
        else installeer();
      }
    });
    teken();
  },
};


// ---------------------------------------------------------------------
// 10. Combineren: de bouwstenen verwijzen naar elkaar
// Scenario in Claude Code: "Handel incident 456 af". Stap voor stap licht op welke
// bouwsteen aan de beurt is, en naar welke hij verwijst.
// ---------------------------------------------------------------------

// Een verwijzing naar een andere bouwsteen, in de kleur van die bouwsteen
const verwijs = (steen, tekst) => `<span class="cb-ref k-${steen}">${icoon(bouwsteen(steen).icoon)}${tekst}</span>`;

const CB_KAARTEN = {
  instructies: { titel: 'CLAUDE.md', tekst: `Bij een incident: gebruik altijd de skill ${verwijs('skill', 'incident-afhandelen')}.` },
  skill: { titel: 'Skill · incident-afhandelen', tekst: `1. Lees het ticket met ${verwijs('mcp', 'ticket_lezen')}.<br>2. Laat de ${verwijs('subagent', 'log-speurder')} de logs doorzoeken.<br>3. Zet een notitie klaar met ${verwijs('mcp', 'notitie_toevoegen')}.` },
  mcp: { titel: 'Xurrent-MCP-server', tekst: 'Tools: <code>ticket_lezen</code>, <code>notitie_toevoegen</code>' },
  subagent: { titel: 'Subagent · log-speurder', tekst: 'Doorzoekt de logbestanden en geeft een korte samenvatting terug.' },
  hook: { titel: 'Hook · vóór notitie_toevoegen', tekst: 'Blokkeert de notitie als er een wachtwoord in staat.' },
};

const CB_STAPPEN = [
  { actief: [], uitleg: 'Jij vraagt: “Handel incident 456 af.” Kijk hoe de bouwstenen elkaar inschakelen.' },
  { actief: ['instructies'], uitleg: 'Claude Code leest CLAUDE.md bij de start. Die verwijst naar een skill.' },
  { actief: ['skill'], uitleg: 'De skill laadt. Zijn handleiding verwijst naar tools van een MCP-server en naar een subagent.' },
  { actief: ['mcp'], uitleg: 'De agent leest ticket 456 via de MCP-server.' },
  { actief: ['subagent'], uitleg: 'De subagent doorzoekt de logs in zijn eigen context en geeft alleen de samenvatting terug.' },
  { actief: ['hook', 'mcp'], uitleg: 'De agent wil de notitie plaatsen. De hook controleert ze eerst: geen wachtwoord, dus het mag.' },
  { actief: ['plugin'], uitleg: 'Skill, MCP-server, subagent en hook zitten samen in één plugin. Eén installatie, en je collega werkt op dezelfde manier.' },
];

VISUALS.combineren = {
  label: 'Speel het af: één taak, vijf bouwstenen (in Claude Code)', icoon: 'play',
  maak(el) {
    const kaart = steen => `
      <div class="cb-kaart k-${steen}" data-steen="${steen}">
        <div class="cb-kop">${steenIcoon(steen)}<strong>${CB_KAARTEN[steen].titel}</strong></div>
        <p>${CB_KAARTEN[steen].tekst}</p>
      </div>`;

    el.innerHTML = `
      <div class="cb">
        <div class="cb-project">
          <p class="eyebrow">${icoon('folder-open')}In het project</p>
          ${kaart('instructies')}
        </div>
        <div class="cb-plugin k-plugin" data-steen="plugin">
          <p class="eyebrow">${icoon('package')}In de Claude Code-plugin <code>incident-plugin</code></p>
          <div class="cb-raster">
            ${kaart('skill')}
            ${kaart('mcp')}
            ${kaart('subagent')}
            ${kaart('hook')}
          </div>
        </div>
      </div>
      <div class="cb-onder">
        <p class="status cb-status" aria-live="polite"></p>
        <button class="knop primair" type="button" data-volgende></button>
      </div>`;

    let stap = 0;

    function teken() {
      const huidig = CB_STAPPEN[stap];
      el.querySelector('.cb').classList.toggle('bezig', stap > 0);
      el.querySelectorAll('[data-steen]').forEach(deel => {
        const actief = huidig.actief.includes(deel.dataset.steen);
        deel.classList.toggle('actief', actief);
        if (actief) herstartAnimatie(deel, 'pop');
      });
      const status = el.querySelector('.cb-status');
      status.innerHTML = `${icoon(stap === 0 ? 'user-round' : 'link')}<span>${huidig.uitleg}</span>`;
      herstartAnimatie(status, 'nieuw');

      const isLaatste = stap === CB_STAPPEN.length - 1;
      el.querySelector('[data-volgende]').innerHTML = stap === 0
        ? `${icoon('play')}Start`
        : isLaatste ? `${icoon('rotate-ccw')}Opnieuw` : `Volgende stap${icoon('arrow-right')}`;
      tekenIconen();
    }

    el.querySelector('[data-volgende]').addEventListener('click', () => {
      stap = stap === CB_STAPPEN.length - 1 ? 0 : stap + 1;
      teken();
    });
    teken();
  },
};


// ---------------------------------------------------------------------
// 11. Overzicht: de wegwijzer. Van "wat wil je?" naar de bouwsteen
// die past. Klik op een bouwsteen: zijn pad licht op en je ziet waarom
// hij past, en waarom een andere bouwsteen hier minder goed past.
// ---------------------------------------------------------------------

// Elke tak is een doel. Een tak met twee paden splitst nog één keer.
const WEGWIJZER = [
  { doel: 'Regels of kennis meegeven', paden: [
    { vraag: 'Geldt altijd', steen: 'instructies', voorbeeld: '“Schrijf code in het Engels.”',
      waarom: 'Staat in een bestand dat de agent bij elke start inleest.',
      nietAnders: 'Waarom geen skill? Die laadt pas als een taak erom vraagt. Regels die altijd gelden, horen hier.' },
    { vraag: 'Alleen bij een soort taak', steen: 'skill', voorbeeld: '“Zo handel je een incident af.”',
      waarom: 'De agent kent alleen de naam en laadt de handleiding pas als de taak erom vraagt.',
      nietAnders: 'Waarom geen projectinstructies? Dan zit de hele handleiding altijd in de context, ook als je hem niet nodig hebt.' },
  ] },
  { doel: 'Iets moet zeker gebeuren', paden: [
    { steen: 'hook', voorbeeld: 'Na elke wijziging: code opmaken.',
      waarom: 'Draait automatisch op een vast moment. Het model komt er niet aan te pas.',
      nietAnders: 'Waarom geen instructie? Die volgt het model meestal, maar niet altijd.' },
  ] },
  { doel: 'Een ander systeem gebruiken', paden: [
    { steen: 'mcp', voorbeeld: 'Tickets lezen uit het ticketsysteem.',
      waarom: 'Geeft de agent tools om met dat systeem te praten.',
      nietAnders: 'Waarom geen skill? Een skill zegt hoe je iets doet, maar geeft geen toegang tot het systeem.' },
  ] },
  { doel: 'Werk uitbesteden', paden: [
    { steen: 'subagent', voorbeeld: 'Een grote zoektocht door de code.',
      waarom: 'Werkt in een eigen context en geeft alleen het resultaat terug.',
      nietAnders: 'Waarom niet zelf? Dan vult al dat zoekwerk de context van de hoofdagent.' },
  ] },
  { doel: 'Alles delen met collega’s', paden: [
    { steen: 'plugin', voorbeeld: 'Dezelfde skills en hooks voor het hele team.',
      waarom: 'Eén installatie, en iedereen heeft dezelfde bouwstenen.',
      nietAnders: 'Waarom niet los? Dan stelt elke collega alles zelf in.' },
  ] },
];

VISUALS.overzicht = {
  label: 'De wegwijzer: klik op een bouwsteen', icoon: 'signpost',
  maak(el) {
    const padHtml = pad => {
      const b = bouwsteen(pad.steen);
      return `
        <li class="ww-pad k-${pad.steen}" data-pad="${pad.steen}">
          ${pad.vraag ? `<span class="ww-vraag">${pad.vraag}</span>` : ''}
          <button class="ww-blad" type="button" data-kies="${pad.steen}" aria-pressed="false">
            ${steenIcoon(pad.steen)}
            <span><strong>${b.naam}</strong><small>${pad.voorbeeld}</small></span>
          </button>
        </li>`;
    };

    el.innerHTML = `
      <div class="ww">
        <div class="ww-start">${icoon('signpost')}<strong>Wat wil je?</strong></div>
        <ul class="ww-takken">
          ${WEGWIJZER.map(tak => `
            <li class="ww-tak">
              <span class="ww-doel">${tak.doel}</span>
              <ul class="ww-paden ${tak.paden.length > 1 ? 'splitst' : ''}">${tak.paden.map(padHtml).join('')}</ul>
            </li>`).join('')}
        </ul>
      </div>
      <div class="ww-uitleg" aria-live="polite"></div>
      <button class="link-knop ww-combi" type="button" data-naar-begrip="combineren">${icoon('link')}Vaak gebruik je er meerdere samen: zie Combineren</button>`;

    const allePaden = WEGWIJZER.flatMap(tak => tak.paden);

    function kies(steen) {
      const pad = allePaden.find(p => p.steen === steen);
      const b = bouwsteen(steen);

      // Het gekozen pad oplichten, de rest dimmen
      el.querySelector('.ww').classList.toggle('focus', Boolean(pad));
      el.querySelectorAll('.ww-pad').forEach(p => p.classList.toggle('actief', p.dataset.pad === steen));
      el.querySelectorAll('.ww-tak').forEach(t => t.classList.toggle('actief', Boolean(t.querySelector(`[data-pad="${steen}"]`))));
      el.querySelectorAll('[data-kies]').forEach(k => k.setAttribute('aria-pressed', String(k.dataset.kies === steen)));

      const uitleg = el.querySelector('.ww-uitleg');
      if (!pad) {
        uitleg.className = 'ww-uitleg';
        uitleg.innerHTML = `${icoon('mouse-pointer-click')}<span>Volg een pad van links naar rechts. Klik op een bouwsteen om te zien waarom hij past.</span>`;
      } else {
        uitleg.className = `ww-uitleg gekozen k-${steen}`;
        uitleg.innerHTML = `
          ${steenIcoon(steen)}
          <div>
            <p><strong>${b.naam}</strong> <span class="ov-badge">${b.badge}</span></p>
            <p>${pad.waarom}</p>
            <p class="ww-niet">${icoon('scale')}<span>${pad.nietAnders}</span></p>
            <button class="link-knop" type="button" data-naar-begrip="${b.begrip}">Meer over ${b.naam}${icoon('arrow-right')}</button>
          </div>`;
        herstartAnimatie(uitleg, 'nieuw');
      }
      tekenIconen();
    }

    el.addEventListener('click', e => {
      const knop = e.target.closest('[data-kies]');
      if (knop) kies(knop.getAttribute('aria-pressed') === 'true' ? null : knop.dataset.kies);
    });
    kies(null);
  },
};
