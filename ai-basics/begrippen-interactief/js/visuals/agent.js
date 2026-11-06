// =====================================================================
// VISUALS · DEEL 2: VAN CHAT NAAR AGENT
// codeeragent · tool · toolaanroep · chatagent · harnas · agentisch
// =====================================================================


// ---------------------------------------------------------------------
// Codeeragent: model + harnas + tools. Zet een deel uit en zie wat er
// overblijft.
// ---------------------------------------------------------------------
const CA_DELEN = [
  { id: 'model',  icoon: 'brain',  naam: 'Model',  wat: 'denkt en kiest de volgende stap' },
  { id: 'harnas', icoon: 'shield', naam: 'Harnas', wat: 'voert uit en bewaakt' },
  { id: 'tools',  icoon: 'wrench', naam: 'Tools',  wat: 'lezen, wijzigen, testen' },
];

// Wat er overblijft, afhankelijk van welke delen aan staan
function caResultaat(aan) {
  if (!aan.model) {
    return { agent: false, titel: 'Geen agent', uitleg: 'Zonder model is er niemand die nadenkt en de volgende stap kiest.' };
  }
  if (!aan.harnas && aan.tools) {
    return { agent: false, titel: 'Geen agent', uitleg: 'Het model vraagt om een tool, maar niemand voert die uit. Er gebeurt niets.' };
  }
  if (!aan.harnas) {
    return { agent: false, titel: 'Alleen een model', uitleg: 'Het model kan alleen tekst schrijven. Jij kopieert en test alles zelf.' };
  }
  if (!aan.tools) {
    return { agent: false, titel: 'Een chat', uitleg: 'Het harnas stuurt je vraag naar het model, maar zonder tools kan het alleen antwoorden met tekst.' };
  }
  return { agent: true, titel: 'Codeeragent', uitleg: 'Het model kiest, het harnas voert uit, de tools doen het werk. Samen kunnen ze programmeren.' };
}

VISUALS.codeeragent = {
  label: 'Probeer het: zet een deel uit', icoon: 'mouse-pointer-click',
  maak(el) {
    // Alle drie de delen staan aan bij de start
    const aan = { model: true, harnas: true, tools: true };

    el.innerHTML = `
      <div class="formule">
        ${CA_DELEN.map((d, i) => `
          ${i > 0 ? '<span class="f-teken" aria-hidden="true">+</span>' : ''}
          <button class="f-deel" type="button" data-deel="${d.id}" aria-pressed="true">
            <span class="ti">${icoon(d.icoon)}</span>
            <div><small>${d.naam}</small><br><strong>${d.wat}</strong></div>
          </button>`).join('')}
        <span class="f-teken" aria-hidden="true">=</span>
        <div class="f-resultaat" aria-live="polite"><small></small><strong></strong></div>
      </div>
      <p class="status" style="margin-top:16px"></p>`;

    function toon() {
      // De knoppen tonen of hun deel aan of uit staat
      el.querySelectorAll('[data-deel]').forEach(knop => {
        const staatAan = aan[knop.dataset.deel];
        knop.setAttribute('aria-pressed', staatAan ? 'true' : 'false');
        knop.classList.toggle('uit', !staatAan);
      });

      const r = caResultaat(aan);
      const resultaat = el.querySelector('.f-resultaat');
      resultaat.classList.toggle('geen', !r.agent);
      resultaat.querySelector('small').textContent = r.agent ? 'Resultaat' : 'Wat overblijft';
      resultaat.querySelector('strong').textContent = r.titel;

      const status = el.querySelector('.status');
      status.className = 'status' + (r.agent ? ' ok' : ' let-op');
      status.innerHTML = `${icoon(r.agent ? 'circle-check' : 'info')}<span>${r.uitleg}</span>`;
      tekenIconen();
    }

    el.querySelectorAll('[data-deel]').forEach(knop => knop.addEventListener('click', () => {
      aan[knop.dataset.deel] = !aan[knop.dataset.deel];
      toon();
    }));
    toon();
  },
};


// ---------------------------------------------------------------------
// Tool: het model kiest een tool aan de hand van de toolbeschrijving.
// Met duidelijke beschrijvingen kiest het meteen de juiste; met vage
// beschrijvingen moet het gokken.
// ---------------------------------------------------------------------
const TB_TOOLS = [
  { id: 'lezen',    icoon: 'file-text',       naam: 'bestand_lezen',      uitleg: 'Geeft de inhoud van een bestand.',               invoer: 'pad',      vaagUitleg: 'Hulpfunctie.' },
  { id: 'commando', icoon: 'square-terminal', naam: 'commando_uitvoeren', uitleg: 'Voert een commando uit, zoals een test.',        invoer: 'commando', vaagUitleg: 'Voert iets uit.' },
  { id: 'ticket',   icoon: 'ticket',          naam: 'ticket_lezen',       uitleg: 'Haalt een ticket op uit het ticketsysteem.',     invoer: 'nummer',   vaagUitleg: 'Haalt gegevens op.' },
  { id: 'web',      icoon: 'search',          naam: 'web_zoeken',         uitleg: 'Zoekt op internet en geeft de beste resultaten.', invoer: 'zoekterm', vaagUitleg: 'Geeft resultaten.' },
];

const TB_TAKEN = [
  { tekst: 'Wat staat er in zoekfunctie.ts?', tool: 'lezen',    aanroep: 'bestand_lezen({ "pad": "zoekfunctie.ts" })' },
  { tekst: 'Draai de tests',                  tool: 'commando', aanroep: 'commando_uitvoeren({ "commando": "npm test" })' },
  { tekst: 'Wat vraagt ticket 123?',          tool: 'ticket',   aanroep: 'ticket_lezen({ "nummer": 123 })' },
  { tekst: 'Hoe negeer ik accenten in JavaScript?', tool: 'web', aanroep: 'web_zoeken({ "zoekterm": "JavaScript accenten negeren" })' },
];

VISUALS.tool = {
  label: 'Probeer het: geef de agent een taak', icoon: 'mouse-pointer-click',
  maak(el) {
    let vaag = false;      // vage of duidelijke beschrijvingen
    let taak = 0;          // welke taak gekozen is

    el.innerHTML = `
      <div class="segment" role="group" aria-label="Soort beschrijving">
        <button type="button" data-vaag="nee" aria-pressed="true">Duidelijke beschrijving</button>
        <button type="button" data-vaag="ja" aria-pressed="false">Vage beschrijving</button>
      </div>
      <p class="eyebrow tb-kop">${icoon('eye')}Dit ziet het model van elke tool</p>
      <ul class="tb-kaarten"></ul>
      <div class="voorbeeld-rij tb-taken" role="group" aria-label="Kies een taak">
        <span class="noot">Taak:</span>
        ${TB_TAKEN.map((t, i) => `<button class="chip" type="button" data-taak="${i}" aria-pressed="false">${t.tekst}</button>`).join('')}
      </div>
      <p class="status" style="margin-top:14px" aria-live="polite"></p>`;

    function toon() {
      const gekozen = TB_TAKEN[taak];

      // De knoppen bovenaan en de taken
      el.querySelectorAll('[data-vaag]').forEach(knop => knop.setAttribute('aria-pressed', String((knop.dataset.vaag === 'ja') === vaag)));
      el.querySelectorAll('[data-taak]').forEach(knop => knop.setAttribute('aria-pressed', String(Number(knop.dataset.taak) === taak)));

      // De toolkaarten: naam, uitleg en invoer. Vaag: tool_1, tool_2, ...
      el.querySelector('.tb-kaarten').innerHTML = TB_TOOLS.map((tool, i) => {
        const klasse = vaag ? 'twijfel' : (tool.id === gekozen.tool ? 'gekozen' : 'rust');
        return `
          <li class="tb-kaart ${klasse}">
            <span class="tb-icoon">${icoon(vaag ? 'circle-help' : tool.icoon)}</span>
            <div>
              <code>${vaag ? 'tool_' + (i + 1) : tool.naam}</code>
              <p>${vaag ? tool.vaagUitleg : tool.uitleg}</p>
              <small>invoer: <code>${vaag ? 'x' : tool.invoer}</code></small>
            </div>
          </li>`;
      }).join('');

      // Wat het model doet
      const status = el.querySelector('.status');
      if (vaag) {
        status.className = 'status let-op';
        status.innerHTML = `${icoon('circle-help')}<span>Aan deze beschrijvingen ziet het model niet welke tool past. Het moet gokken, of het vraagt het aan jou.</span>`;
        herstartAnimatie(el.querySelector('.tb-kaarten'), 'schud');
      } else {
        status.className = 'status ok';
        status.innerHTML = `${icoon('circle-check')}<span>Het model leest de beschrijvingen en kiest de juiste tool:<br><code>${gekozen.aanroep}</code></span>`;
      }
      tekenIconen();
    }

    el.querySelectorAll('[data-vaag]').forEach(knop => knop.addEventListener('click', () => { vaag = knop.dataset.vaag === 'ja'; toon(); }));
    el.querySelectorAll('[data-taak]').forEach(knop => knop.addEventListener('click', () => { taak = Number(knop.dataset.taak); toon(); }));
    toon();
  },
};


// ---------------------------------------------------------------------
// Toolaanroep en toolresultaat
// Links de systeemprompt: daarin staan de tools die het model mag gebruiken.
// Rechts het verloop, stap voor stap: vraag → model denkt → toolaanroep →
// toolresultaat → ... → antwoord. Twee voorbeelden om uit te kiezen.
// ---------------------------------------------------------------------

// Soorten stappen: wie spreekt, en hoe ziet het kaartje eruit
const TA_SOORTEN = {
  vraag:     { wie: 'Jij',                         icoon: 'user-round' },
  denkt:     { wie: 'Model denkt',                 icoon: 'brain' },
  aanroep:   { wie: 'Toolaanroep · model → software', icoon: 'wrench' },
  resultaat: { wie: 'Toolresultaat · software → model', icoon: 'clipboard-check' },
  antwoord:  { wie: 'Antwoord · model → jij',      icoon: 'message-square' },
};

const TA_VOORBEELDEN = {
  weer: {
    knop: 'Regenjas of niet?',
    systeem: 'Je bent een behulpzame assistent. De gebruiker woont in Antwerpen en fietst naar kantoor.',
    tools: [
      { naam: 'weer_ophalen', invoer: 'stad, dag', icoon: 'cloud-rain', uitleg: 'Geeft de weersverwachting.' },
      { naam: 'agenda_lezen', invoer: 'dag', icoon: 'calendar', uitleg: 'Geeft de afspraken van een dag.' },
      { naam: 'mail_versturen', invoer: 'aan, tekst', icoon: 'mail', uitleg: 'Verstuurt een e-mail.' },
    ],
    stappen: [
      { soort: 'vraag', tekst: '“Moet ik morgen een regenjas aandoen?”',
        uitleg: 'Jij stelt een vraag. De software stuurt die samen met de systeemprompt naar het model.' },
      { soort: 'denkt', tekst: 'Het weer van morgen ken ik niet. In de systeemprompt staat de tool <code>weer_ophalen</code>. Die gebruik ik.',
        uitleg: 'Het model weet welke tools er zijn, omdat ze in de systeemprompt staan. Het beslist zelf dat het er een nodig heeft.' },
      { soort: 'aanroep', tool: 'weer_ophalen', tekst: 'weer_ophalen({ "stad": "Antwerpen", "dag": "morgen" })',
        uitleg: 'De toolaanroep: de naam van de tool en de invoer. De stad haalt het model uit de systeemprompt. Het model voert zelf niets uit.' },
      { soort: 'resultaat', tool: 'weer_ophalen', tekst: '{ "regen": "80%", "van": "07:00", "tot": "10:00", "temperatuur": "9 °C" }',
        uitleg: 'De software voert de tool uit en geeft het toolresultaat terug aan het model.' },
      { soort: 'denkt', tekst: 'Regen tussen 7 en 10 uur. Fietst de gebruiker dan? Dat staat in de agenda: <code>agenda_lezen</code>.',
        uitleg: 'Met het resultaat beslist het model wat de volgende stap is. Soms is dat nog een tool.' },
      { soort: 'aanroep', tool: 'agenda_lezen', tekst: 'agenda_lezen({ "dag": "morgen" })',
        uitleg: 'Een tweede toolaanroep. De tool <code>mail_versturen</code> heeft het model niet nodig, dus die laat het liggen.' },
      { soort: 'resultaat', tool: 'agenda_lezen', tekst: '[ { "tijd": "08:30", "wat": "Vergadering op kantoor" } ]',
        uitleg: 'Het tweede toolresultaat komt terug.' },
      { soort: 'antwoord', tekst: 'Ja. Morgen regent het tussen 7 en 10 uur, en om 8.30 uur heb je een vergadering op kantoor. Trek je regenjas aan.',
        uitleg: 'Pas nu antwoordt het model, op basis van de twee toolresultaten.' },
    ],
  },

  zoekfout: {
    knop: 'Waarom vindt de zoekfunctie José niet?',
    systeem: 'Je bent een programmeerassistent voor het project <code>klantenportaal</code>.',
    tools: [
      { naam: 'ticket_lezen', invoer: 'nummer', icoon: 'ticket', uitleg: 'Haalt een ticket op uit het ticketsysteem.' },
      { naam: 'bestand_lezen', invoer: 'pad', icoon: 'file-text', uitleg: 'Geeft de inhoud van een bestand.' },
      { naam: 'commando_uitvoeren', invoer: 'commando', icoon: 'square-terminal', uitleg: 'Voert een commando uit, zoals een test.' },
    ],
    stappen: [
      { soort: 'vraag', tekst: '“Kun je ticket 123 bekijken? Klanten zeggen dat zoeken niet werkt.”',
        uitleg: 'Jij stelt een vraag. De software stuurt die samen met de systeemprompt naar het model.' },
      { soort: 'denkt', tekst: 'Ik kan het ticket niet zien. Met <code>ticket_lezen</code> kan ik het ophalen.',
        uitleg: 'Het model weet welke tools er zijn, omdat ze in de systeemprompt staan. Het beslist zelf welke het nodig heeft.' },
      { soort: 'aanroep', tool: 'ticket_lezen', tekst: 'ticket_lezen({ "nummer": 123 })',
        uitleg: 'De toolaanroep: de naam van de tool en de invoer. Het model voert zelf niets uit.' },
      { soort: 'resultaat', tool: 'ticket_lezen', tekst: '{ "titel": "Zoekfout", "beschrijving": "Zoeken op ‘José’ geeft niets, op ‘Jose’ wel." }',
        uitleg: 'De software voert de tool uit en geeft het toolresultaat terug aan het model.' },
      { soort: 'denkt', tekst: 'Het gaat om accenten. Ik moet de code van de zoekfunctie zien: <code>bestand_lezen</code>.',
        uitleg: 'Met het resultaat beslist het model wat de volgende stap is.' },
      { soort: 'aanroep', tool: 'bestand_lezen', tekst: 'bestand_lezen({ "pad": "src/zoekfunctie.ts" })',
        uitleg: 'Een tweede toolaanroep, met andere invoer.' },
      { soort: 'resultaat', tool: 'bestand_lezen', tekst: 'return klanten.filter(k => k.naam.includes(zoekterm));',
        uitleg: 'Nu zit de code in de context, en kan het model de fout zien.' },
      { soort: 'antwoord', tekst: 'Gevonden: de zoekfunctie vergelijkt letter voor letter, dus “é” en “e” tellen als verschillend. Zal ik accenten laten negeren bij het zoeken?',
        uitleg: 'Het model antwoordt op basis van wat de tools teruggaven. Wijzigen doet het pas als jij dat wilt.' },
    ],
  },
};

VISUALS.toolaanroep = {
  label: 'Probeer het: volg een toolaanroep', icoon: 'mouse-pointer-click',
  maak(el) {
    let voorbeeld = 'weer';
    let stap = 0;

    el.innerHTML = `
      <div class="segment ta-keuze" role="group" aria-label="Kies een voorbeeld">
        ${Object.entries(TA_VOORBEELDEN).map(([id, v]) => `<button type="button" data-voorbeeld="${id}" aria-pressed="false">${v.knop}</button>`).join('')}
      </div>
      <div class="ta">
        <aside class="ta-systeem">
          <p class="eyebrow">${icoon('scroll-text')}Systeemprompt</p>
          <p class="ta-systeem-uitleg">Tekst die de software altijd vóór jouw vraag meestuurt. Zo weet het model welke tools er zijn.</p>
          <p class="ta-systeem-tekst"></p>
          <p class="ta-tools-kop">Tools die je mag gebruiken:</p>
          <ul class="ta-tools"></ul>
        </aside>
        <ol class="ta-verloop" aria-live="polite"></ol>
      </div>
      <div class="ta-onder">
        <p class="status"></p>
        <div class="knoppen">
          <button class="knop" type="button" data-actie="terug">${icoon('chevron-left')}Vorige</button>
          <button class="knop primair" type="button" data-actie="verder"></button>
        </div>
      </div>`;

    const verloop = el.querySelector('.ta-verloop');

    function teken() {
      const v = TA_VOORBEELDEN[voorbeeld];
      const huidig = v.stappen[stap];

      // Keuzeknoppen
      el.querySelectorAll('[data-voorbeeld]').forEach(knop => knop.setAttribute('aria-pressed', String(knop.dataset.voorbeeld === voorbeeld)));

      // Systeemprompt met de tools. De tool die nu gebruikt wordt, licht op.
      el.querySelector('.ta-systeem-tekst').innerHTML = v.systeem;
      el.querySelector('.ta-tools').innerHTML = v.tools.map(tool => {
        const inGebruik = huidig.tool === tool.naam;
        const genoemd = huidig.soort === 'denkt' && huidig.tekst.includes(tool.naam);
        return `
          <li class="ta-tool ${inGebruik ? 'in-gebruik' : ''} ${genoemd ? 'gekozen' : ''}">
            <span class="ta-tool-icoon">${icoon(tool.icoon)}</span>
            <span><code>${tool.naam}(${tool.invoer})</code><small>${tool.uitleg}</small></span>
          </li>`;
      }).join('');

      // Het verloop tot nu toe. Alleen de nieuwste stap komt binnen met een animatie.
      verloop.innerHTML = v.stappen.slice(0, stap + 1).map((s, i) => {
        const soort = TA_SOORTEN[s.soort];
        const isCode = s.soort === 'aanroep' || s.soort === 'resultaat';
        return `
          <li class="ta-stap ta-${s.soort} ${i === stap ? 'is-huidig' : ''}">
            <span class="ta-wie">${icoon(soort.icoon)}${soort.wie}</span>
            <div class="ta-inhoud">${isCode ? `<code class="ta-code">${s.tekst}</code>` : s.tekst}</div>
          </li>`;
      }).join('');
      verloop.scrollTo({ top: verloop.scrollHeight, behavior: scrollGedrag });

      // Uitleg en knoppen
      const status = el.querySelector('.status');
      status.innerHTML = `${icoon('info')}<span>${huidig.uitleg}</span>`;
      herstartAnimatie(status, 'nieuw');
      el.querySelector('[data-actie="terug"]').disabled = stap === 0;
      const klaar = stap === v.stappen.length - 1;
      el.querySelector('[data-actie="verder"]').innerHTML = klaar ? `${icoon('rotate-ccw')}Opnieuw` : `Volgende stap${icoon('chevron-right')}`;
      tekenIconen();
    }

    // Bediening
    el.querySelector('[data-actie="verder"]').addEventListener('click', () => {
      stap = stap === TA_VOORBEELDEN[voorbeeld].stappen.length - 1 ? 0 : stap + 1;
      teken();
    });
    el.querySelector('[data-actie="terug"]').addEventListener('click', () => { stap = Math.max(0, stap - 1); teken(); });
    el.querySelectorAll('[data-voorbeeld]').forEach(knop => knop.addEventListener('click', () => {
      voorbeeld = knop.dataset.voorbeeld;
      stap = 0;
      teken();
    }));
    teken();
  },
};


// ---------------------------------------------------------------------
// AI-agent: wie doet het werk, in een chat of met een agent?
// ---------------------------------------------------------------------
VISUALS.chatagent = {
  label: 'Chat of agent?', icoon: 'eye',
  maak(el) {
    el.innerHTML = `
      <div class="vgl">
        <div class="vgl-kolom">
          <div class="vgl-kop"><span class="ti">${icoon('message-square')}</span>In een chat</div>
          <ul class="vgl-lijst">
            <li>${icoon('user-round')}Jij stelt elke vraag</li>
            <li>${icoon('copy')}Jij kopieert zelf de code</li>
          </ul>
        </div>
        <div class="vgl-kolom sterk">
          <div class="vgl-kop"><span class="ti">${icoon('bot')}</span>Met een agent</div>
          <ul class="vgl-lijst">
            <li>${icoon('file-search')}De agent leest zelf</li>
            <li>${icoon('pencil')}De agent wijzigt zelf</li>
            <li>${icoon('circle-check')}De agent controleert zelf</li>
            <li>${icoon('eye')}Jij geeft het doel en houdt toezicht</li>
          </ul>
        </div>
      </div>`;
  },
};


// ---------------------------------------------------------------------
// Agentharnas: stap voor stap volgen wie wat doet
// Vier banen (Jij, Model, Harnas, Tools) en pijlen ertussen.
// ---------------------------------------------------------------------
const BANEN = [
  { id: 'jij', naam: 'Jij', icoon: 'user-round' },
  { id: 'model', naam: 'Model', icoon: 'brain' },
  { id: 'harnas', naam: 'Harnas', icoon: 'shield' },
  { id: 'tools', naam: 'Tools', icoon: 'wrench' },
];

const SCENARIO = {
  agent: [
    { van: 'jij', naar: 'harnas', label: '“Herstel de zoekfunctie en test met namen met accenten, zoals José.”', uitleg: 'Jij geeft het doel. Daarna houd je toezicht.' },
    { van: 'harnas', naar: 'model', label: 'context: jouw vraag + projectinstructies', uitleg: 'Het harnas stuurt de context naar het model.' },
    { van: 'model', naar: 'harnas', label: 'toolaanroep <code>ticket_lezen</code> · nummer <code>123</code>', uitleg: 'Het model kan zelf niets openen. Het vraagt om een tool, met de juiste invoer.' },
    { van: 'harnas', naar: 'tools', label: 'voert <code>ticket_lezen</code> uit', uitleg: 'Het harnas voert de tool echt uit.' },
    { van: 'tools', naar: 'harnas', label: 'toolresultaat: titel “Zoekfout” + beschrijving', uitleg: 'Het toolresultaat komt terug. Het harnas geeft het aan het model, dat daarmee verder werkt.' },
    { van: 'model', naar: 'harnas', label: 'toolaanroep <code>bestand_lezen</code> · <code>zoekfunctie.ts</code>', uitleg: 'Het model kiest zelf de volgende stap: de code bekijken.' },
    { van: 'tools', naar: 'harnas', label: 'toolresultaat: de inhoud van het bestand', uitleg: 'Nu zit de code in de context, en kan het model de fout zien.' },
    { van: 'model', naar: 'harnas', label: 'toolaanroep: wijzig <code>zoekfunctie.ts</code>', uitleg: 'Het model stelt een wijziging voor.' },
    { van: 'harnas', naar: 'jij', label: 'Mag ik <code>zoekfunctie.ts</code> wijzigen?', soort: 'vraag', uitleg: 'In dit voorbeeld mag de agent bestanden pas wijzigen na jouw akkoord. Wat wel en niet mag, stel jij in; het harnas bewaakt het.' },
    { van: 'jij', naar: 'harnas', label: 'Akkoord', uitleg: 'Jij keurt goed.' },
    { van: 'harnas', naar: 'tools', label: 'voert de wijziging uit in <code>zoekfunctie.ts</code>', uitleg: 'Pas nu voert het harnas de wijziging echt uit.' },
    { van: 'model', naar: 'harnas', label: 'toolaanroep: voer de test uit · <code>npm test</code>', uitleg: 'Het model wil controleren of het werkt, en vraagt daarom om de test.' },
    { van: 'harnas', naar: 'tools', label: 'voert <code>npm test</code> uit', uitleg: 'Het harnas voert de test uit. De agent controleert zo zelf zijn werk.' },
    { van: 'tools', naar: 'harnas', label: 'toolresultaat: alle tests geslaagd', uitleg: 'Het resultaat gaat weer naar het model, dat beslist dat de taak klaar is.' },
    { van: 'harnas', naar: 'jij', label: '“Klaar: zoeken werkt nu ook met José.”', uitleg: 'Klaar. Jij beoordeelt het resultaat.' },
  ],
  chat: [
    { van: 'jij', naar: 'model', label: '“Waarom vindt mijn zoekfunctie José niet?” + jij plakt de code van <code>zoekfunctie.ts</code> erbij', uitleg: 'Jij stelt een vraag en plakt zelf de code in de chat. Het model kan het bestand niet zelf openen.' },
    { van: 'model', naar: 'jij', label: 'antwoord met een voorstel voor nieuwe code (als tekst)', uitleg: 'Het model antwoordt met tekst. Zonder harnas en tools kan het niets openen of uitvoeren.' },
    // In een chat zijn er geen tools: jij doet dit werk zelf (van en naar zijn allebei 'jij')
    { van: 'jij', naar: 'jij', label: 'jij kopieert de code naar <code>zoekfunctie.ts</code>', uitleg: 'Jij kopieert de code zelf naar het bestand.' },
    { van: 'jij', naar: 'jij', label: 'jij start zelf de test', uitleg: 'Jij voert zelf de test uit.' },
    { van: 'jij', naar: 'jij', label: 'jij ziet de fout: één test faalt', uitleg: 'Jij ziet de fout. Het model weet daar niets van.' },
    { van: 'jij', naar: 'model', label: 'jij plakt de foutmelding in de chat', uitleg: 'En jij stelt de volgende vraag. Zonder harnas ben jij de tussenpersoon.' },
  ],
};

// Wat voor soort stap is het? Bepaalt kleur, icoon en naam van het label.
const STAP_SOORTEN = {
  bericht:   { naam: 'Bericht',     icoon: 'message-square' },
  aanroep:   { naam: 'Toolaanroep', icoon: 'wrench' },
  uitvoeren: { naam: 'Uitvoeren',   icoon: 'play' },
  resultaat: { naam: 'Resultaat',   icoon: 'clipboard-check' },
  vraag:     { naam: 'Vraag',       icoon: 'hand' },
  zelf:      { naam: 'Zelf doen',   icoon: 'user-round-cog' },
};

function soortVan(stap) {
  if (stap.van === stap.naar) return 'zelf';
  if (stap.soort === 'vraag') return 'vraag';
  if (stap.van === 'tools') return 'resultaat';
  if (stap.naar === 'tools') return 'uitvoeren';
  if (stap.van === 'model' && stap.label.startsWith('toolaanroep')) return 'aanroep';
  return 'bericht';
}

VISUALS.harnas = {
  label: 'Probeer het: eerst een gewone chat, dan met harnas', icoon: 'mouse-pointer-click',
  maak(el) {
    // We beginnen bij de chat, want die kent iedereen al
    let modus = 'chat';
    let stap = 0;

    el.innerHTML = `
      <div class="seq-balk">
        <div class="segment" role="group" aria-label="Vergelijk">
          <button type="button" data-modus="chat" aria-pressed="true">1. Zonder harnas (chat)</button>
          <button type="button" data-modus="agent" aria-pressed="false">2. Met harnas (agent)</button>
        </div>
        <div class="knoppen">
          <button class="knop" type="button" data-actie="terug">${icoon('chevron-left')}Vorige</button>
          <button class="knop primair" type="button" data-actie="verder"></button>
        </div>
      </div>
      <div class="seq-scroll">
        <div class="seq-banen"></div>
        <ol class="seq-lijst"></ol>
      </div>
      <div class="seq-uitleg">
        <p class="status" aria-live="polite"></p>
        <span class="seq-teller"></span>
      </div>`;

    // Midden van baan i, in procent van de breedte
    const midden = i => (i + 0.5) * (100 / BANEN.length);
    const baanIndex = id => BANEN.findIndex(b => b.id === id);

    function teken() {
      const stappen = SCENARIO[modus];
      const huidig = stappen[stap];
      const huidigeSoort = soortVan(huidig);

      // De vier banen bovenaan. Wie nu iets stuurt, licht op; wie het
      // ontvangt, licht op zodra de pijl aankomt. Tools "werken" even.
      // In een chat doen harnas en tools niet mee: die banen staan grijs.
      const UIT_IN_CHAT = { harnas: 'geen harnas', tools: 'geen tools' };
      el.querySelector('.seq-banen').innerHTML = BANEN.map(baan => {
        const uitTekst = modus === 'chat' ? UIT_IN_CHAT[baan.id] : null;
        const klassen = ['baan', 'soort-' + huidigeSoort];
        if (uitTekst) klassen.push('is-uit');
        if (baan.id === huidig.van) klassen.push('is-zender');
        if (baan.id === huidig.naar) klassen.push('is-ontvanger');
        if (baan.id === huidig.naar && huidigeSoort === 'uitvoeren') klassen.push('werkt');
        return `<div class="${klassen.join(' ')}"><span class="bi">${icoon(baan.icoon)}</span>${baan.naam}${uitTekst ? `<small>${uitTekst}</small>` : ''}</div>`;
      }).join('');

      // Eén rij met een pijl per stap tot nu toe. Alleen de huidige pijl
      // wordt getekend als animatie, met een bolletje dat van zender naar ontvanger reist.
      el.querySelector('.seq-lijst').innerHTML = stappen.slice(0, stap + 1).map((s, i) => {
        const a = midden(baanIndex(s.van));
        const b = midden(baanIndex(s.naar));
        const links = Math.min(a, b);
        const rechts = Math.max(a, b);
        const isHuidig = i === stap;
        const soort = soortVan(s);
        // Label links uitlijnen bij pijlen links, rechts uitlijnen bij pijlen rechts
        const labelStijl = links >= 50
          ? `text-align:right;padding-right:${100 - rechts}%;padding-left:8px`
          : `padding-left:${links}%;padding-right:8px`;
        // Iets wat je zelf doet heeft geen pijl, alleen een stip op je eigen baan
        const lijn = soort === 'zelf'
          ? `<span class="zelf-stip" style="left:${a}%"></span>`
          : `<span class="pijl ${b > a ? 'naar-rechts' : 'naar-links'}" style="left:${links}%;width:${rechts - links}%">${isHuidig ? '<span class="reiziger"></span>' : ''}</span>`;
        return `
          <li class="seq-rij soort-${soort} ${isHuidig ? 'is-huidig' : ''}">
            <div class="seq-label" style="${labelStijl}"><span><span class="seq-soort">${icoon(STAP_SOORTEN[soort].icoon)}${STAP_SOORTEN[soort].naam}</span>${s.label}</span></div>
            <div class="seq-lijn">${lijn}</div>
          </li>`;
      }).join('');

      // Uitleg en knoppen
      const status = el.querySelector('.status');
      status.className = 'status' + (huidig.soort === 'vraag' ? ' let-op' : '');
      status.innerHTML = `${icoon(STAP_SOORTEN[huidigeSoort].icoon)}<span>${huidig.uitleg}</span>`;
      herstartAnimatie(status, 'nieuw');
      el.querySelector('.seq-teller').textContent = `Stap ${stap + 1} van ${stappen.length}`;

      el.querySelector('[data-actie="terug"]').disabled = stap === 0;
      // Aan het einde van de chat gaat de knop door naar de versie met harnas
      const klaar = stap === stappen.length - 1;
      const verder = el.querySelector('[data-actie="verder"]');
      if (!klaar) verder.innerHTML = `Volgende stap${icoon('chevron-right')}`;
      else if (modus === 'chat') verder.innerHTML = `Nu met harnas${icoon('arrow-right')}`;
      else verder.innerHTML = `${icoon('rotate-ccw')}Opnieuw`;
      el.querySelectorAll('[data-modus]').forEach(knop => knop.setAttribute('aria-pressed', knop.dataset.modus === modus ? 'true' : 'false'));
      tekenIconen();

      // Nieuwste stap in beeld schuiven (binnen het schema)
      const scroll = el.querySelector('.seq-scroll');
      scroll.scrollTo({ top: scroll.scrollHeight, behavior: scrollGedrag });
    }

    el.querySelector('[data-actie="verder"]').addEventListener('click', () => {
      const klaar = stap === SCENARIO[modus].length - 1;
      if (klaar && modus === 'chat') modus = 'agent';   // door naar de versie met harnas
      stap = klaar ? 0 : stap + 1;
      teken();
    });
    el.querySelector('[data-actie="terug"]').addEventListener('click', () => { stap = Math.max(0, stap - 1); teken(); });
    el.querySelectorAll('[data-modus]').forEach(knop => knop.addEventListener('click', () => {
      modus = knop.dataset.modus;
      stap = 0;
      teken();
    }));
    teken();
  },
};


// ---------------------------------------------------------------------
// Agentisch programmeren: human in the loop
// Een lus met drie stations: jij beschrijft → de agent werkt → jij
// beoordeelt. De agent doet het werk, jij neemt de beslissingen.
// In de eerste ronde wijzigt de agent ook iets wat je niet vroeg.
// Keur je dat blind goed, of stuur je bij?
// ---------------------------------------------------------------------

// Wat de agent doet in elke ronde
const HL_WERK = [
  { icoon: 'file-text', tekst: 'Leest <code>zoekfunctie.ts</code>' },
  { icoon: 'pencil', tekst: 'Laat accenten negeren bij het zoeken' },
  { icoon: 'flask-conical', tekst: 'Voert <code>npm test</code> uit: geslaagd' },
];

// Wat jij te zien krijgt om te beoordelen, per ronde
const HL_VOORSTEL = [
  [ { bestand: 'zoekfunctie.ts', wat: 'accenten negeren bij het zoeken' },
    { bestand: 'instellingen.json', wat: 'zoeklimiet van 50 naar 10', ongevraagd: true } ],
  [ { bestand: 'zoekfunctie.ts', wat: 'accenten negeren bij het zoeken' } ],
];

VISUALS.agentisch = {
  label: 'Probeer het: jij blijft aan het stuur', icoon: 'mouse-pointer-click',
  maak(el) {

    // ---------- 1. Opbouw: de lus bovenaan, het paneel eronder ----------
    el.innerHTML = `
      <ol class="hl-lus">
        <li class="hl-station mens" data-station="vraag">${icoon('user-round')}<strong>Jij beschrijft</strong></li>
        <li class="hl-pijl" aria-hidden="true">${icoon('arrow-right')}</li>
        <li class="hl-station" data-station="werkt">${icoon('bot')}<strong>Agent werkt</strong></li>
        <li class="hl-pijl" aria-hidden="true">${icoon('arrow-right')}</li>
        <li class="hl-station mens" data-station="oordeel">${icoon('user-round-search')}<strong>Jij beoordeelt</strong></li>
      </ol>
      <p class="hl-terug noot">${icoon('corner-down-left')}Niet goed? Jij stuurt bij, en de lus begint opnieuw.</p>
      <div class="hl-paneel" aria-live="polite"></div>`;

    const paneel = el.querySelector('.hl-paneel');
    let ronde = 0;   // 0 = eerste poging, 1 = na het bijsturen

    // Zet het juiste station in de lus in de kijker
    function zetStation(naam) {
      el.querySelectorAll('.hl-station').forEach(s => {
        s.classList.toggle('actief', s.dataset.station === naam);
      });
    }

    // Vult het paneel en tekent de iconen
    function toon(html) {
      paneel.innerHTML = html;
      herstartAnimatie(paneel, 'nieuw');
      tekenIconen();
    }

    // ---------- 2. Station 1: jij geeft de opdracht ----------
    function stapVraag() {
      ronde = 0;
      zetStation('vraag');
      toon(`
        <p class="hl-bericht">“Herstel de zoekfunctie: ‘José’ moet ook gevonden worden.”</p>
        <div class="knoppen"><button class="knop primair" type="button" data-doe="werk">${icoon('send')}Geef de opdracht</button></div>`);
    }

    // ---------- 3. Station 2: de agent werkt zelfstandig ----------
    function stapWerkt() {
      zetStation('werkt');
      const regels = HL_WERK.map((w, i) =>
        `<li style="--i:${i}">${icoon(w.icoon)}<span>${w.tekst}</span></li>`).join('');
      toon(`
        <ul class="hl-werk">${regels}</ul>
        <div class="knoppen"><button class="knop primair" type="button" data-doe="oordeel">${icoon('eye')}Bekijk wat de agent deed</button></div>`);
    }

    // ---------- 4. Station 3: jij beoordeelt het voorstel ----------
    function stapOordeel() {
      zetStation('oordeel');
      const wijzigingen = HL_VOORSTEL[ronde].map(w => `
        <li class="${w.ongevraagd ? 'ongevraagd' : ''}">
          ${icoon(w.ongevraagd ? 'flag' : 'file-diff')}
          <span><code>${w.bestand}</code>: ${w.wat}</span>
          ${w.ongevraagd ? '<small>niet gevraagd</small>' : ''}
        </li>`).join('');
      const bijsturen = ronde === 0
        ? `<button class="knop" type="button" data-doe="bijsturen">${icoon('message-square')}Bijsturen</button>`
        : '';
      toon(`
        <p class="hl-kop"><strong>${HL_VOORSTEL[ronde].length} bestand${HL_VOORSTEL[ronde].length > 1 ? 'en' : ''} gewijzigd</strong> · tests geslaagd</p>
        <ul class="hl-wijzigingen">${wijzigingen}</ul>
        <div class="knoppen">
          <button class="knop primair" type="button" data-doe="goedkeuren">${icoon('thumbs-up')}Goedkeuren</button>
          ${bijsturen}
        </div>`);
    }

    // ---------- 5. Jouw beslissing ----------
    function stapBijsturen() {
      ronde = 1;
      zetStation('vraag');
      toon(`
        <p class="hl-bericht">“Laat <code>instellingen.json</code> ongemoeid. Pas alleen de zoekfunctie aan.”</p>
        <div class="knoppen"><button class="knop primair" type="button" data-doe="werk">${icoon('send')}Stuur bij</button></div>`);
    }

    function stapGoedgekeurd() {
      zetStation('');
      const melding = ronde === 0
        ? `<p class="status let-op">${icoon('triangle-alert')}<span>Goedgekeurd, maar nu toont het zoeken nog maar 10 resultaten. Dat had je niet gevraagd. De tests slaagden toch: daarom lees jij elke wijziging na.</span></p>`
        : `<p class="status ok">${icoon('party-popper')}<span>Klaar. De agent deed het werk; jij gaf de opdracht, stuurde bij en keurde goed.</span></p>`;
      toon(`
        ${melding}
        <div class="knoppen"><button class="knop" type="button" data-doe="opnieuw">${icoon('rotate-ccw')}Opnieuw</button></div>`);
    }

    // ---------- 6. Knoppen koppelen ----------
    const acties = {
      werk: stapWerkt,
      oordeel: stapOordeel,
      bijsturen: stapBijsturen,
      goedkeuren: stapGoedgekeurd,
      opnieuw: stapVraag,
    };
    paneel.addEventListener('click', e => {
      const knop = e.target.closest('[data-doe]');
      if (knop) acties[knop.dataset.doe]();
    });

    stapVraag();
  },
};
