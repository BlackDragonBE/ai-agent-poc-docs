// =====================================================================
// VISUALS · DEEL 5: LANGE SESSIES
// groei · samenvatten · nieuwesessie · geheugen
// Elk begrip heeft zijn eigen schema. Ze delen alleen een paar
// bouwstenen: het contextvenster, het gezicht van het model en een teller.
// =====================================================================


// ---------------------------------------------------------------------
// 1. Gedeelde bouwstenen
//    Getallen zijn in duizenden tokens: 12 betekent 12k = 12.000 tokens.
// ---------------------------------------------------------------------
const SESSIE_VENSTER = 200;   // het contextvenster: 200k tokens
const SESSIE_SYSTEEM = { soort: 'systeem', label: 'Systeemprompt', grootte: 12 };

const BLOK_ICONEN = {
  systeem: 'scroll-text', gesprek: 'message-square', toolwerk: 'wrench',
  samenvatting: 'fold-vertical', geheugen: 'hard-drive',
};

const blokGrootte = blok => blok.grootte ?? (blok.vraag + blok.tools + blok.antwoord);
const vensterGebruik = blokken => blokken.reduce((som, blok) => som + blokGrootte(blok), 0);
const sessieWacht = ms => new Promise(klaar => setTimeout(klaar, minderBeweging ? 0 : ms));

// Eén blok in een venster. De hoogte is het deel van het venster dat het inneemt.
function blokHtml(blok, index, extraKlassen = '') {
  const stijl = `height:calc(${(blokGrootte(blok) / SESSIE_VENSTER) * 100}% - 3px);--i:${index}`;

  // Een beurt: vraag, toolwerk en antwoord naast elkaar
  if (blok.soort === 'beurt') {
    return `
      <div class="blok beurt ${extraKlassen}" style="${stijl}" title="Beurt ${blok.nr}: ${blok.vraag}k vraag, ${blok.tools}k toolwerk, ${blok.antwoord}k antwoord">
        <span class="d d-vraag" style="flex:${blok.vraag}"></span>
        <span class="d d-tools" style="flex:${blok.tools}"></span>
        <span class="d d-antwoord" style="flex:${blok.antwoord}"></span>
        <span class="blok-label">Beurt ${blok.nr} · ${blokGrootte(blok)}k</span>
      </div>`;
  }
  return `
    <div class="blok ${blok.soort} ${extraKlassen}" style="${stijl}" title="${blok.label}: ${blokGrootte(blok)}k tokens">
      ${icoon(BLOK_ICONEN[blok.soort])}<span>${blok.label} · ${blokGrootte(blok)}k</span>
    </div>`;
}

// De inhoud van een venster: alle blokken + hoeveel er nog vrij is
function vensterInhoud(blokken, klassenVoor = () => '') {
  return blokken.map((blok, i) => blokHtml(blok, i, klassenVoor(blok, i))).join('')
    + `<span class="vrij-label">${SESSIE_VENSTER - vensterGebruik(blokken)}k vrij</span>`;
}

// Hoe scherp is het model? Hoe voller het venster, hoe minder scherp.
function modelScherpte(procent) {
  if (procent >= 80) return { icoon: 'frown', tekst: 'Mist details', klasse: 'slecht' };
  if (procent >= 50) return { icoon: 'meh', tekst: 'Minder scherp', klasse: 'matig' };
  return { icoon: 'smile', tekst: 'Scherp', klasse: 'goed' };
}

// Het gezicht van het model bijwerken; het "wiebelt" als de stemming verandert
function zetGezicht(plek, procent) {
  const scherpte = modelScherpte(procent);
  const gezicht = plek.querySelector('.gezicht');
  const veranderd = gezicht.dataset.klasse && gezicht.dataset.klasse !== scherpte.klasse;
  gezicht.dataset.klasse = scherpte.klasse;
  gezicht.className = `gezicht ${scherpte.klasse}`;
  gezicht.innerHTML = icoon(scherpte.icoon);
  plek.querySelector('.scherpte-tekst').textContent = scherpte.tekst;
  if (veranderd) herstartAnimatie(gezicht, 'wissel');
}

// Een getal laten optellen (of aftellen) naar een nieuwe waarde, met "k" erachter
function telNaar(plek, naar) {
  const van = Number(plek.dataset.waarde || 0);
  plek.dataset.waarde = naar;
  if (minderBeweging || van === naar) { plek.textContent = `${naar}k`; return; }
  const start = performance.now();
  const stap = nu => {
    const deel = Math.min(1, (nu - start) / 600);
    plek.textContent = `${Math.round(van + (naar - van) * deel)}k`;
    if (deel < 1) requestAnimationFrame(stap);
  };
  requestAnimationFrame(stap);
}

// Een uitlegregel zetten (soort: '', ok, let-op of fout)
function zetSessieStatus(plek, soort, icoonNaam, html) {
  plek.className = `status sessie-status ${soort}`;
  plek.innerHTML = `${icoon(icoonNaam)}<span>${html}</span>`;
  herstartAnimatie(plek, 'nieuw');
  tekenIconen();
}

// HTML voor een tegel met het gezicht van het model
const gezichtTegelHtml = titel => `
  <div class="tegel"><small>${titel}</small><strong class="scherpte"><span class="gezicht"></span><span class="scherpte-tekst"></span></strong></div>`;


// ---------------------------------------------------------------------
// 2. De context groeit: elke beurt gaat alles opnieuw mee
// ---------------------------------------------------------------------
const GROEI_BEURTEN = [
  { vraag: 1, tools: 30, antwoord: 3 },
  { vraag: 1, tools: 26, antwoord: 4 },
  { vraag: 2, tools: 34, antwoord: 3 },
  { vraag: 1, tools: 28, antwoord: 3 },
];

VISUALS.groei = {
  label: 'Probeer het: praat verder en kijk naar de tellers', icoon: 'mouse-pointer-click',
  maak(el) {
    let blokken, beurtNummer, totaal;

    el.innerHTML = `
      <div class="sessie-lab">
        <div class="venster-kolom">
          <div class="kop"><h4>Contextvenster</h4><span class="stand"></span></div>
          <div class="venster" role="img" aria-label="Inhoud van het contextvenster"></div>
          <ul class="legenda">
            <li><span class="kleur d-vraag"></span>vraag</li>
            <li><span class="kleur d-tools"></span>toolwerk</li>
            <li><span class="kleur d-antwoord"></span>antwoord</li>
          </ul>
        </div>
        <div class="sessie-rechts">
          <div class="lab-tegels">
            <div class="tegel"><small>Deze beurt verstuurd</small><strong data-veld="beurt">0k</strong></div>
            <div class="tegel"><small>Totaal verstuurd</small><strong data-veld="totaal">0k</strong></div>
            ${gezichtTegelHtml('Het model')}
          </div>
          <div class="knoppen">
            <button class="knop primair" type="button" data-actie="beurt">${icoon('message-square-plus')}Volgende beurt</button>
            <button class="knop" type="button" data-actie="opnieuw">${icoon('rotate-ccw')}Opnieuw</button>
          </div>
          <p class="status sessie-status" aria-live="polite"></p>
        </div>
      </div>`;

    const venster = el.querySelector('.venster');
    const status = el.querySelector('.sessie-status');

    // effect 'verzend': alle blokken "gaan mee" naar het model, één na één
    function teken(effect) {
      venster.innerHTML = vensterInhoud(blokken, () => effect || '');
      const procent = Math.round((vensterGebruik(blokken) / SESSIE_VENSTER) * 100);
      el.querySelector('.stand').textContent = `${procent}%`;
      venster.classList.toggle('vol', procent >= 80);
      zetGezicht(el, procent);
      tekenIconen();
    }

    function begin() {
      blokken = [SESSIE_SYSTEEM];
      beurtNummer = 0;
      totaal = 0;
      teken();
      telNaar(el.querySelector('[data-veld="beurt"]'), 0);
      telNaar(el.querySelector('[data-veld="totaal"]'), 0);
      zetSessieStatus(status, '', 'lightbulb', 'Klik op “Volgende beurt”. Let op hoeveel er elke keer verstuurd wordt.');
    }

    el.querySelector('[data-actie="beurt"]').addEventListener('click', () => {
      const beurt = GROEI_BEURTEN[beurtNummer % GROEI_BEURTEN.length];
      if (vensterGebruik(blokken) + blokGrootte(beurt) > SESSIE_VENSTER) {
        herstartAnimatie(venster, 'schud');
        zetSessieStatus(status, 'fout', 'triangle-alert', '<strong>Vol.</strong> De volgende beurt past niet meer. Wat je dan doet, zie je bij de volgende twee begrippen.');
        return;
      }
      beurtNummer += 1;
      blokken = [...blokken, { soort: 'beurt', nr: beurtNummer, ...beurt }];
      const dezeBeurt = vensterGebruik(blokken);
      totaal += dezeBeurt;
      teken('verzend');
      telNaar(el.querySelector('[data-veld="beurt"]'), dezeBeurt);
      telNaar(el.querySelector('[data-veld="totaal"]'), totaal);

      const procent = Math.round((dezeBeurt / SESSIE_VENSTER) * 100);
      if (procent >= 80) zetSessieStatus(status, 'fout', 'frown', `Beurt ${beurtNummer}: ${procent}% vol. Elke beurt is nu duur, en het model mist details.`);
      else if (procent >= 50) zetSessieStatus(status, 'let-op', 'meh', `Beurt ${beurtNummer}: ${dezeBeurt}k verstuurd. Het venster raakt vol en het model wordt minder scherp.`);
      else zetSessieStatus(status, '', 'send', `Beurt ${beurtNummer}: ${dezeBeurt}k verstuurd. Alles van de vorige beurten ging opnieuw mee.`);
    });
    el.querySelector('[data-actie="opnieuw"]').addEventListener('click', begin);

    begin();
  },
};


// ---------------------------------------------------------------------
// 3. Samenvatten: een vol venster wordt één klein blok.
//    Rechts zie je wat bewaard blijft en wat verloren gaat.
// ---------------------------------------------------------------------
const VOL_VENSTER = [
  SESSIE_SYSTEEM,
  { soort: 'gesprek', label: 'Jouw vragen en de antwoorden', grootte: 22 },
  { soort: 'toolwerk', label: '20 zoekresultaten', grootte: 56 },
  { soort: 'toolwerk', label: 'zoekfunctie.ts, het hele bestand', grootte: 40 },
  { soort: 'toolwerk', label: 'Uitvoer van de tests', grootte: 38 },
];
const SAMENVATTING_BLOK = { soort: 'samenvatting', label: 'Samenvatting', grootte: 6 };

// Wat het model wist, en of het na het samenvatten nog bewaard is
const FEITEN = [
  { tekst: 'De fout zit in <code>zoekfunctie.ts</code>', bewaard: true },
  { tekst: 'Accenten worden niet verwerkt', bewaard: true },
  { tekst: 'De exacte code van de zoekfunctie', bewaard: false },
  { tekst: 'Welke drie tests faalden', bewaard: false },
];

VISUALS.samenvatten = {
  label: 'Probeer het: vat een vol venster samen', icoon: 'mouse-pointer-click',
  maak(el) {
    let samengevat = false;
    let bezig = false;

    el.innerHTML = `
      <div class="sessie-lab">
        <div class="venster-kolom">
          <div class="kop"><h4>Contextvenster</h4><span class="stand"></span></div>
          <div class="venster" role="img" aria-label="Inhoud van het contextvenster"></div>
        </div>
        <div class="sessie-rechts">
          <div class="lab-tegels twee">
            <div class="tegel"><small>In de context</small><strong data-veld="context"></strong></div>
            ${gezichtTegelHtml('Het model')}
          </div>
          <div>
            <h4 class="sv-kop">Wat weet het model nog?</h4>
            <ul class="sv-feiten"></ul>
          </div>
          <div class="knoppen">
            <button class="knop primair" type="button" data-actie="samenvatten">${icoon('fold-vertical')}Samenvatten</button>
            <button class="knop" type="button" data-actie="opnieuw" hidden>${icoon('rotate-ccw')}Opnieuw</button>
          </div>
          <div class="model-zegt" hidden><span class="agent-i">${icoon('brain')}</span><p></p></div>
        </div>
      </div>`;

    const venster = el.querySelector('.venster');
    const modelZegt = el.querySelector('.model-zegt');

    function teken() {
      const blokken = samengevat ? [SESSIE_SYSTEEM, SAMENVATTING_BLOK] : VOL_VENSTER;
      venster.innerHTML = vensterInhoud(blokken, blok => (samengevat && blok.soort === 'samenvatting' ? 'nieuw' : ''));
      const gebruik = vensterGebruik(blokken);
      const procent = Math.round((gebruik / SESSIE_VENSTER) * 100);
      el.querySelector('.stand').textContent = `${procent}%`;
      venster.classList.toggle('vol', procent >= 80);
      telNaar(el.querySelector('[data-veld="context"]'), gebruik);
      zetGezicht(el, procent);

      // Elk feit: nog in de context, bewaard in de samenvatting, of kwijt
      el.querySelector('.sv-feiten').innerHTML = FEITEN.map(feit => {
        const staat = !samengevat ? 'in' : (feit.bewaard ? 'bewaard' : 'kwijt');
        const label = { in: 'in de context', bewaard: 'in de samenvatting', kwijt: 'kwijt' }[staat];
        const icoonNaam = { in: 'eye', bewaard: 'fold-vertical', kwijt: 'eraser' }[staat];
        return `<li class="feit ${staat}">${icoon(icoonNaam)}<span>${feit.tekst}</span><small>${label}</small></li>`;
      }).join('');

      el.querySelector('[data-actie="samenvatten"]').hidden = samengevat;
      el.querySelector('[data-actie="opnieuw"]').hidden = !samengevat;
      modelZegt.hidden = !samengevat;
      if (samengevat) {
        modelZegt.querySelector('p').innerHTML = 'Ik weet nog <strong>waar</strong> de fout zit, maar niet meer hoe de code er precies uitziet. Ik lees <code>zoekfunctie.ts</code> opnieuw in.';
        herstartAnimatie(modelZegt, 'nieuw');
      }
      tekenIconen();
    }

    el.querySelector('[data-actie="samenvatten"]').addEventListener('click', async () => {
      if (bezig) return;
      bezig = true;
      venster.querySelectorAll('.blok:not(.systeem)').forEach(blok => blok.classList.add('pers'));
      await sessieWacht(500);
      samengevat = true;
      teken();
      bezig = false;
    });
    el.querySelector('[data-actie="opnieuw"]').addEventListener('click', () => {
      samengevat = false;
      teken();
    });

    teken();
  },
};


// ---------------------------------------------------------------------
// 4. Nieuwe sessie: de zoekfout is opgelost, nu een nieuwe taak.
//    Ga je verder in dezelfde sessie, of begin je opnieuw?
// ---------------------------------------------------------------------
const OUDE_TAAK = { soort: 'gesprek', label: 'Alles over de zoekfout', grootte: 140 };
const NIEUWE_VRAAG = { soort: 'gesprek', label: '“Voeg een exportknop toe.”', grootte: 1 };

const SESSIE_KEUZES = {
  verder: {
    knop: 'Verder in deze sessie',
    blokken: [SESSIE_SYSTEEM, OUDE_TAAK, NIEUWE_VRAAG],
    weetNog: 'Ja, alles',
    status: ['let-op', 'meh', 'Elke vraag over de exportknop sleept 140k tokens over de zoekfout mee. Dat is duur, en het model raakt sneller afgeleid.'],
  },
  nieuw: {
    knop: 'Nieuwe sessie',
    blokken: [SESSIE_SYSTEEM, NIEUWE_VRAAG],
    weetNog: 'Nee, niets',
    status: ['ok', 'smile', 'Een schone lei: goedkoop en scherp. Moet het model toch iets onthouden van de zoekfout? Dat zie je bij “Geheugen”.'],
  },
};

VISUALS.nieuwesessie = {
  label: 'Probeer het: nieuwe taak, nieuwe sessie?', icoon: 'mouse-pointer-click',
  maak(el) {
    let keuze = null;

    el.innerHTML = `
      <p class="ns-situatie">${icoon('party-popper')}<span>De zoekfout is opgelost. Nu wil je: <strong>“Voeg een exportknop toe.”</strong> Wat doe je?</span></p>
      <div class="segment ns-keuze" role="group" aria-label="Kies">
        ${Object.entries(SESSIE_KEUZES).map(([id, k]) => `<button type="button" data-keuze="${id}" aria-pressed="false">${k.knop}</button>`).join('')}
      </div>
      <div class="sessie-lab">
        <div class="venster-kolom">
          <div class="kop"><h4>Contextvenster</h4><span class="stand"></span></div>
          <div class="venster klein" role="img" aria-label="Inhoud van het contextvenster"></div>
        </div>
        <div class="sessie-rechts">
          <div class="lab-tegels">
            <div class="tegel"><small>Verstuurd voor je vraag</small><strong data-veld="verstuurd">0k</strong></div>
            ${gezichtTegelHtml('Het model')}
            <div class="tegel"><small>Weet nog van de zoekfout</small><strong class="ns-weet"></strong></div>
          </div>
          <p class="status sessie-status" aria-live="polite"></p>
        </div>
      </div>`;

    const venster = el.querySelector('.venster');
    const status = el.querySelector('.sessie-status');

    function teken(effect) {
      // Voor je kiest: de oude taak zit nog in het venster
      const blokken = keuze ? SESSIE_KEUZES[keuze].blokken : [SESSIE_SYSTEEM, OUDE_TAAK];
      venster.innerHTML = vensterInhoud(blokken, blok => (blok === NIEUWE_VRAAG ? effect || '' : ''));
      const gebruik = vensterGebruik(blokken);
      const procent = Math.round((gebruik / SESSIE_VENSTER) * 100);
      el.querySelector('.stand').textContent = `${procent}%`;
      zetGezicht(el, procent);
      telNaar(el.querySelector('[data-veld="verstuurd"]'), keuze ? gebruik : 0);
      el.querySelector('.ns-weet').textContent = keuze ? SESSIE_KEUZES[keuze].weetNog : '–';
      el.querySelectorAll('[data-keuze]').forEach(knop => knop.setAttribute('aria-pressed', String(knop.dataset.keuze === keuze)));
      tekenIconen();
    }

    el.querySelectorAll('[data-keuze]').forEach(knop => knop.addEventListener('click', async () => {
      const nieuweKeuze = knop.dataset.keuze;
      if (nieuweKeuze === keuze) return;

      // Kies je een nieuwe sessie, dan vliegt het oude gesprek eerst het venster uit
      if (nieuweKeuze === 'nieuw') {
        venster.querySelectorAll('.blok.gesprek').forEach(blok => blok.classList.add('weg'));
        await sessieWacht(400);
      }
      keuze = nieuweKeuze;
      teken('nieuw');
      zetSessieStatus(status, ...SESSIE_KEUZES[keuze].status);
    }));

    teken();
    zetSessieStatus(status, '', 'lightbulb', 'Kies hierboven. Kijk naar het venster en de drie tegels.');
  },
};


// ---------------------------------------------------------------------
// 5. Geheugen: hoe een agent bewaart en terugleest, stap voor stap
// Claude Code: de agent schrijft zelf, tijdens het gesprek, met zijn
//   bestandstools. Bij een nieuwe sessie laadt alleen het overzicht
//   MEMORY.md; de losse bestanden leest hij pas als ze nodig zijn.
// Codex: na het gesprek vat Codex op de achtergrond samen en voegt die
//   herinneringen in een volgende sessie in.
// Copilot: maakt zelf herinneringen bij de repository op GitHub, en
//   controleert de bron voor hij ze gebruikt.
// omp: geheugen staat standaard uit. De lokale variant vat bij de start
//   bewaarde sessies samen en zet dat in de systeemprompt.
//
// Elke stap beschrijft wat er in de drie kolommen staat:
//   s1 = sessie 1, schijf = de geheugenmap, s2 = de context van sessie 2.
// Een item: { wie: 'jij' | 'agent' | 'tool' | 'stil', tekst }
// Een bestand: { naam, regels: [...], nieuw, rust }   (rust = blijft op schijf)
// Een contextstuk: { soort, icoon, tekst, nieuw }
// ---------------------------------------------------------------------
const GH_MEMORY_OUD = '- [Tests](tests.md): draai altijd npm test';
const GH_MEMORY_NIEUW = '- [Zoeken](zoeken-accenten.md): accenten negeren';

const GEHEUGEN_PRODUCTEN = {
  claude: {
    knop: 'Claude Code',
    map: '~/.claude/projects/klantenportaal/memory/',
    stappen: [
      { actief: 's1',
        s1: [{ wie: 'jij', tekst: '“Zoeken moet ook met accenten werken. Onthoud dat.”' }],
        schijf: [{ naam: 'MEMORY.md', regels: [GH_MEMORY_OUD] }],
        s2: [],
        uitleg: 'Je vraagt de agent iets te onthouden. Claude Code heeft daarvoor een eigen geheugenmap, buiten de context. Hij bewaart ook uit zichzelf wat hij leert uit je correcties.' },
      { actief: 'schijf',
        s1: [{ wie: 'jij', tekst: '“Zoeken moet ook met accenten werken. Onthoud dat.”' },
             { wie: 'tool', tekst: 'schrijft <code>zoeken-accenten.md</code>' },
             { wie: 'tool', tekst: 'zet een regel in <code>MEMORY.md</code>' }],
        schijf: [{ naam: 'MEMORY.md', regels: [GH_MEMORY_OUD, GH_MEMORY_NIEUW], nieuweRegel: 1 },
                 { echteNaam: 'zoeken-accenten.md', regels: ['Zoeken negeert accenten:', '“José” vindt ook “Jose”.'], nieuw: true }],
        s2: [],
        uitleg: 'De agent schrijft zelf, met zijn gewone bestandstools: één bestand per herinnering, en één regel in het overzicht <code>MEMORY.md</code>.' },
      { actief: 's2',
        s1: 'klaar',
        schijf: [{ naam: 'MEMORY.md', regels: [GH_MEMORY_OUD, GH_MEMORY_NIEUW] },
                 { echteNaam: 'zoeken-accenten.md', regels: ['Zoeken negeert accenten:', '“José” vindt ook “Jose”.'], rust: true }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'geheugen', icoon: 'list', tekst: 'MEMORY.md (overzicht)', nieuw: true }],
        uitleg: 'Een nieuwe sessie begint met een lege context. Claude Code laadt automatisch het overzicht <code>MEMORY.md</code> (de eerste 200 regels). De losse bestanden nog niet.' },
      { actief: 's2',
        s1: 'klaar',
        schijf: [{ naam: 'MEMORY.md', regels: [GH_MEMORY_OUD, GH_MEMORY_NIEUW] },
                 { echteNaam: 'zoeken-accenten.md', regels: ['Zoeken negeert accenten:', '“José” vindt ook “Jose”.'], gelezen: true }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'geheugen', icoon: 'list', tekst: 'MEMORY.md (overzicht)' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Pas de zoekfunctie aan.”', nieuw: true },
             { soort: 'geheugen', icoon: 'file-text', tekst: 'zoeken-accenten.md (gelezen)', nieuw: true }],
        uitleg: 'In het overzicht ziet de agent dat er iets over zoeken bewaard is. Pas nu leest hij dat bestand, met een gewone toolaanroep.' },
      { actief: 's2', einde: true,
        s1: 'klaar',
        schijf: [{ naam: 'MEMORY.md', regels: [GH_MEMORY_OUD, GH_MEMORY_NIEUW] },
                 { echteNaam: 'zoeken-accenten.md', regels: ['Zoeken negeert accenten:', '“José” vindt ook “Jose”.'] }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'geheugen', icoon: 'list', tekst: 'MEMORY.md (overzicht)' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Pas de zoekfunctie aan.”' },
             { soort: 'geheugen', icoon: 'file-text', tekst: 'zoeken-accenten.md (gelezen)' }],
        antwoord: 'Ik pas de zoekfunctie aan en laat accenten negeren, zoals in mijn geheugen staat.',
        uitleg: 'Het model zelf onthoudt niets. Het weet het weer omdat het bestand opnieuw in de context kwam.' },
    ],
  },
  codex: {
    knop: 'Codex',
    map: '~/.codex/memories/',
    stappen: [
      { actief: 's1',
        s1: [{ wie: 'jij', tekst: '“Zoeken op José vindt niets.”' },
             { wie: 'agent', tekst: 'Opgelost: zoeken negeert nu accenten.' }],
        schijf: [],
        s2: [],
        uitleg: 'Je werkt gewoon aan je taak. Je hoeft niet te vragen om iets te onthouden.' },
      { actief: 'schijf',
        s1: [{ wie: 'jij', tekst: '“Zoeken op José vindt niets.”' },
             { wie: 'agent', tekst: 'Opgelost: zoeken negeert nu accenten.' },
             { wie: 'stil', tekst: 'Het gesprek ligt een tijdje stil' }],
        schijf: [{ echteNaam: 'herinneringen', regels: ['Zoeken in klantenportaal negeert accenten.'], nieuw: true }],
        s2: [],
        uitleg: 'Als een gesprek een tijdje stilligt, vat Codex op de achtergrond het nuttige samen in lokale geheugenbestanden. Geheimen haalt het eruit.' },
      { actief: 's2',
        s1: 'klaar',
        schijf: [{ echteNaam: 'herinneringen', regels: ['Zoeken in klantenportaal negeert accenten.'] }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'geheugen', icoon: 'brain-circuit', tekst: 'Herinneringen (ingevoegd)', nieuw: true }],
        uitleg: 'In een nieuwe sessie voegt Codex de bestaande herinneringen in de context in. Dat kun je per gesprek of in de instellingen uitzetten.' },
      { actief: 's2', einde: true,
        s1: 'klaar',
        schijf: [{ echteNaam: 'herinneringen', regels: ['Zoeken in klantenportaal negeert accenten.'] }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'geheugen', icoon: 'brain-circuit', tekst: 'Herinneringen (ingevoegd)' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Pas de zoekfunctie aan.”', nieuw: true }],
        antwoord: 'Ik pas de zoekfunctie aan. Accenten blijven genegeerd, zoals vorige keer.',
        uitleg: 'Het model zelf onthoudt niets. Het weet het weer omdat de herinnering opnieuw in de context kwam.' },
    ],
  },
  copilot: {
    knop: 'Copilot',
    opslag: { icoon: 'github', label: 'Bij de repository op GitHub' },
    map: 'Copilot Memory · repository klantenportaal',
    stappen: [
      { actief: 's1',
        s1: [{ wie: 'jij', tekst: '“Gebruik in dit project altijd pnpm, niet npm.”' }],
        schijf: [],
        s2: [],
        uitleg: 'Je werkt met Copilot, bijvoorbeeld in Copilot CLI of de cloud agent, en zegt iets wat later nog van pas komt.' },
      { actief: 'schijf',
        s1: [{ wie: 'jij', tekst: '“Gebruik in dit project altijd pnpm, niet npm.”' },
             { wie: 'tool', tekst: 'bewaart een herinnering bij de repository' }],
        schijf: [{ echteNaam: 'herinnering', regels: ['Gebruik pnpm, niet npm.', 'Bron: package.json'], nieuw: true }],
        s2: [],
        uitleg: 'Copilot maakt herinneringen zelf, terwijl hij werkt. Zo’n herinnering hoort bij één repository en verwijst naar de code waarop ze steunt.' },
      { actief: 's2',
        s1: 'klaar',
        schijf: [{ echteNaam: 'herinnering', regels: ['Gebruik pnpm, niet npm.', 'Bron: package.json'], gelezen: true, notitie: 'bron gecontroleerd: klopt nog' }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Voeg een testscript toe.”' },
             { soort: 'geheugen', icoon: 'brain-circuit', tekst: 'Herinnering: gebruik pnpm', nieuw: true }],
        uitleg: 'In een nieuwe sessie haalt Copilot alleen herinneringen op die relevant lijken. Eerst controleert hij de bron tegen de huidige code: klopt die nog?' },
      { actief: 's2', einde: true,
        s1: 'klaar',
        schijf: [{ echteNaam: 'herinnering', regels: ['Gebruik pnpm, niet npm.', 'Bron: package.json'] }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Voeg een testscript toe.”' },
             { soort: 'geheugen', icoon: 'brain-circuit', tekst: 'Herinnering: gebruik pnpm' }],
        antwoord: 'Ik voeg het testscript toe en gebruik pnpm.',
        uitleg: 'Een herinnering is geen harde regel: Copilot gebruikt ze niet altijd. Collega’s met toegang tot de repository hebben er ook iets aan, en ongebruikt verloopt ze na 90 dagen.' },
    ],
  },
  omp: {
    knop: 'omp',
    map: 'omp-geheugen (lokaal)',
    stappen: [
      { actief: 's1',
        s1: [{ wie: 'jij', tekst: '“Zoeken op José vindt niets.”' },
             { wie: 'agent', tekst: 'Opgelost: zoeken negeert nu accenten.' }],
        schijf: [{ echteNaam: 'bewaarde sessies', regels: ['maandag: het hele gesprek'], nieuw: true }],
        s2: [],
        uitleg: 'In omp staat geheugen standaard uit; je kiest zelf een variant. Hier de lokale: omp bewaart je sessies gewoon op schijf.' },
      { actief: 'schijf',
        s1: 'klaar',
        schijf: [{ echteNaam: 'bewaarde sessies', regels: ['maandag: het hele gesprek'] },
                 { echteNaam: 'memory_summary.md', regels: ['Zoeken negeert accenten.'], nieuw: true }],
        s2: [],
        uitleg: 'Bij de volgende start maakt omp op de achtergrond samenvattingen en lessen uit de bewaarde sessies.' },
      { actief: 's2',
        s1: 'klaar',
        schijf: [{ echteNaam: 'bewaarde sessies', regels: ['maandag: het hele gesprek'] },
                 { echteNaam: 'memory_summary.md', regels: ['Zoeken negeert accenten.'], gelezen: true, notitie: 'gaat mee in de systeemprompt' }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt + geheugen', nieuw: true },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Pas de zoekfunctie aan.”', nieuw: true }],
        uitleg: 'De samenvatting komt mee in de systeemprompt van de nieuwe sessie.' },
      { actief: 's2', einde: true,
        s1: 'klaar',
        schijf: [{ echteNaam: 'bewaarde sessies', regels: ['maandag: het hele gesprek'] },
                 { echteNaam: 'memory_summary.md', regels: ['Zoeken negeert accenten.'] }],
        s2: [{ soort: 'systeem', icoon: 'scroll-text', tekst: 'Systeemprompt + geheugen' },
             { soort: 'vraag', icoon: 'user-round', tekst: '“Pas de zoekfunctie aan.”' }],
        antwoord: 'Ik pas de zoekfunctie aan. Accenten blijven genegeerd, zoals vorige keer.',
        uitleg: 'Met de tool <code>learn</code> kan de agent ook zelf een les bewaren. Andere varianten, zoals Hindsight, bewaren al tijdens het gesprek en halen herinneringen op bij de eerste beurt.' },
    ],
  },
};

VISUALS.geheugen = {
  label: 'Speel het af: bewaren en terugvinden', icoon: 'play',
  maak(el) {
    let product = 'claude';
    let stap = 0;

    el.innerHTML = `
      <div class="knoppen gh-bediening">
        <div class="segment" role="group" aria-label="Kies een product">
          ${Object.entries(GEHEUGEN_PRODUCTEN).map(([id, p]) => `<button type="button" data-product="${id}">${p.knop}</button>`).join('')}
        </div>
      </div>
      <div class="gh">
        <section class="gh-kaart" data-kolom="s1">
          <p class="eyebrow">${icoon('message-square')}Sessie 1 · maandag</p>
          <div class="gh-gesprek"></div>
        </section>
        <span class="gh-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <section class="gh-kaart gh-schijf" data-kolom="schijf">
          <p class="eyebrow gh-opslag"></p>
          <code class="gh-map"></code>
          <div class="gh-bestanden"></div>
        </section>
        <span class="gh-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <section class="gh-kaart" data-kolom="s2">
          <p class="eyebrow">${icoon('layers')}Sessie 2 · dinsdag · context</p>
          <div class="gh-venster"></div>
        </section>
      </div>
      <div class="model-zegt" hidden><span class="agent-i">${icoon('brain')}</span><p></p></div>
      <div class="gh-onder">
        <p class="status gh-uitleg" aria-live="polite"></p>
        <button class="knop primair" type="button" data-volgende></button>
      </div>
      <p class="noot gh-tip">${icoon('lightbulb')}Regels die altijd moeten gelden, schrijf je beter zelf in <code>CLAUDE.md</code> of <code>AGENTS.md</code>: die laadt de agent elke sessie volledig.</p>`;

    const gesprekItem = item => {
      if (item.wie === 'jij') return `<p class="gh-bericht">${item.tekst}</p>`;
      if (item.wie === 'agent') return `<p class="gh-antwoord">${icoon('bot')}<span>${item.tekst}</span></p>`;
      if (item.wie === 'stil') return `<p class="gh-stil">${icoon('moon')}<span>${item.tekst}</span></p>`;
      return `<p class="gh-tool">${icoon('wrench')}<span>${item.tekst}</span></p>`;
    };

    const bestandHtml = b => `
      <div class="bestandje ${b.nieuw ? 'nieuw' : ''} ${b.rust ? 'rust' : ''} ${b.gelezen ? 'gelezen' : ''}">
        <span class="naam">${icoon(b.naam === 'MEMORY.md' ? 'list' : 'file-text')}${b.echteNaam || b.naam}</span>
        ${b.regels.map((r, i) => `<span class="regel ${b.nieuweRegel === i ? 'nieuw' : ''}">${r}</span>`).join('')}
        ${b.rust ? '<small>blijft op schijf tot het nodig is</small>' : ''}
        ${b.gelezen ? `<small>${b.notitie || 'wordt nu gelezen'}</small>` : ''}
      </div>`;

    function teken() {
      const p = GEHEUGEN_PRODUCTEN[product];
      const s = p.stappen[stap];

      el.querySelectorAll('[data-product]').forEach(k => k.setAttribute('aria-pressed', String(k.dataset.product === product)));
      el.querySelectorAll('[data-kolom]').forEach(k => k.classList.toggle('actief', k.dataset.kolom === s.actief));

      // Kolom 1: sessie 1 (na afloop gesloten)
      el.querySelector('.gh-gesprek').innerHTML = s.s1 === 'klaar'
        ? `<p class="gh-stil">${icoon('circle-off')}<span>Gesloten. Deze context is weg.</span></p>`
        : s.s1.map(gesprekItem).join('');

      // Kolom 2: de geheugenmap
      el.querySelector('.gh-map').textContent = p.map;
      const opslag = p.opslag || { icoon: 'hard-drive', label: 'Op schijf, buiten de context' };
      el.querySelector('.gh-opslag').innerHTML = `${icoon(opslag.icoon)}${opslag.label}`;
      el.querySelector('.gh-bestanden').innerHTML = s.schijf.length
        ? s.schijf.map(bestandHtml).join('')
        : '<p class="noot">(nog leeg)</p>';

      // Kolom 3: de context van sessie 2
      el.querySelector('.gh-venster').innerHTML = s.s2.length
        ? s.s2.map(stuk => `<span class="gh-stuk ${stuk.soort} ${stuk.nieuw ? 'nieuw' : ''}">${icoon(stuk.icoon)}${stuk.tekst}</span>`).join('')
        : '<p class="noot">(nog niet gestart)</p>';

      // Het antwoord van het model, alleen in de laatste stap
      const modelZegt = el.querySelector('.model-zegt');
      modelZegt.hidden = !s.antwoord;
      if (s.antwoord) {
        modelZegt.querySelector('p').innerHTML = s.antwoord;
        modelZegt.classList.add('raak');
        herstartAnimatie(modelZegt, 'nieuw');
      }

      const uitleg = el.querySelector('.gh-uitleg');
      uitleg.innerHTML = `${icoon(s.einde ? 'sparkles' : 'info')}<span>${s.uitleg}</span>`;
      herstartAnimatie(uitleg, 'nieuw');

      el.querySelector('[data-volgende]').innerHTML = s.einde
        ? `${icoon('rotate-ccw')}Opnieuw`
        : `Volgende stap${icoon('arrow-right')}`;
      tekenIconen();
    }

    el.addEventListener('click', e => {
      const keuze = e.target.closest('[data-product]');
      if (keuze) { product = keuze.dataset.product; stap = 0; teken(); }
      if (e.target.closest('[data-volgende]')) {
        const aantal = GEHEUGEN_PRODUCTEN[product].stappen.length;
        stap = stap === aantal - 1 ? 0 : stap + 1;
        teken();
      }
    });
    teken();
  },
};
