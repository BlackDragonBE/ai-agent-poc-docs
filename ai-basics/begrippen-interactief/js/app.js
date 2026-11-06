// =====================================================================
// APP
// Bouwt de pagina op uit inhoud.js en regelt de navigatie.
// Elk deel is een gids: één begrip tegelijk, met vorige en volgende.
// =====================================================================


// ---------------------------------------------------------------------
// 1. Toestand
// ---------------------------------------------------------------------
const huidigeStap = {};      // per deel: welk begrip nu open staat

const vindDeel = id => HOOFDSTUKKEN.find(h => h.id === id);
const sectieVan = h => document.getElementById('h-' + h.id);
const introSectie = () => document.getElementById('intro');
const zichtbaarDeel = () => HOOFDSTUKKEN.find(h => !sectieVan(h).hidden);   // undefined op de intropagina


// ---------------------------------------------------------------------
// 2. HTML opbouwen
// ---------------------------------------------------------------------

// Het leerpad bovenaan: eerst de intro, dan één knop per deel
function leerpadHtml() {
  const introKnop = `
    <button class="deel-knop intro-knop" type="button" data-deel="intro" aria-label="Intro" title="Intro">
      <span class="nr">${icoon('house')}</span>
    </button>`;
  return introKnop + HOOFDSTUKKEN.map(h => `
    <button class="deel-knop" type="button" data-deel="${h.id}">
      <span class="nr">${icoon(h.icoon)}</span><span class="lbl">${h.kort}</span>
    </button>`).join('');
}

// De intropagina: kop, uitleg, startknop en overzicht van de delen
function introHtml() {
  return `
    <section class="intro" id="intro" hidden>
      <div class="hero-blok">
        <p class="eyebrow">${INTRO.eyebrow}</p>
        <h1>${INTRO.titel}</h1>
        <p class="hero-lead">${INTRO.lead}</p>
      </div>

      <h2 class="intro-kop">${INTRO.uitlegTitel}</h2>
      <ul class="intro-uitleg">
        ${INTRO.uitleg.map(punt => `
          <li>${icoon(punt.icoon)}<strong>${punt.titel}</strong><p>${punt.tekst}</p></li>`).join('')}
      </ul>
      <button class="knop primair intro-start" type="button" data-naar-deel="${HOOFDSTUKKEN[0].id}">
        ${INTRO.startKnop}${icoon('arrow-right')}
      </button>

      <h2 class="intro-kop">${INTRO.delenTitel}</h2>
      <ol class="intro-delen">
        ${HOOFDSTUKKEN.map((h, index) => `
          <li>
            <button class="intro-deel" type="button" data-naar-deel="${h.id}">
              <span class="nr" aria-hidden="true">${index + 1}</span>
              <span><strong>${h.titel}</strong><small>${h.intro}</small></span>
              ${icoon('chevron-right')}
            </button>
          </li>`).join('')}
      </ol>
    </section>`;
}

// Een heel deel: kop + gids
function deelHtml(h, index) {
  return `
    <section class="hoofdstuk" id="h-${h.id}" data-deel="${h.id}" hidden>
      <header class="h-kop">
        <div class="h-nummer" aria-hidden="true">${index + 1}</div>
        <div>
          <h2>${h.titel}</h2>
          <p class="h-intro">${h.intro}</p>
        </div>
      </header>

      <div class="gids">
        <nav class="gids-stappen" aria-label="Begrippen in dit deel">
          ${h.begrippen.map((b, i) => `
            <button class="gids-pil" type="button" data-stap="${i}" title="${b.kortNaam || b.naam}">
              <span class="pi">${icoon(b.icoon)}</span><span class="lbl">${b.kortNaam || b.naam}</span>
            </button>`).join('')}
        </nav>

        ${h.begrippen.map((b, i) => begripHtml(h, b, i)).join('')}

        <div class="gids-nav">
          <button class="knop" type="button" data-nav="vorige"></button>
          <span class="gids-teller"></span>
          <button class="knop primair" type="button" data-nav="volgende"></button>
        </div>
      </div>
    </section>`;
}

// Eén begrip: kop, definitie, visual, voorbeelden, extra tip
function begripHtml(h, b, i) {
  const visual = b.visual ? VISUALS[b.visual] : null;
  if (b.visual && !visual) console.warn(`Visual "${b.visual}" bestaat niet (begrip ${b.id})`);

  const calloutIcoon = { tip: 'lightbulb', note: 'info', warning: 'triangle-alert' };

  return `
    <article class="begrip-stap" data-stap="${i}" hidden>
      <div class="begrip-kop">
        <span class="begrip-icoon">${icoon(b.icoon)}</span>
        <div>
          <p class="eyebrow">Begrip ${i + 1} van ${h.begrippen.length}</p>
          <h3>${b.naam}</h3>
          ${b.alt ? `<p class="alt">${b.alt}</p>` : ''}
        </div>
      </div>

      <p class="definitie">${b.definitie}</p>

      ${visual ? `
        <div class="visual">
          <p class="eyebrow visual-label">${icoon(visual.icoon)}${visual.label}</p>
          <div class="visual-inhoud"></div>
        </div>` : ''}

      ${b.voorbeelden.length ? `
        <div class="voorbeelden-blok">
          <h4 class="eyebrow">Voorbeelden</h4>
          <ul class="voorbeelden">${b.voorbeelden.map(v => `<li><span>${v}</span></li>`).join('')}</ul>
        </div>` : ''}

      ${b.callout ? `
        <div class="callout ${b.callout.soort}">
          ${icoon(calloutIcoon[b.callout.soort])}
          <div><strong>${b.callout.titel}</strong>${b.callout.tekst}</div>
        </div>` : ''}
    </article>`;
}


// ---------------------------------------------------------------------
// 3. Visuals invullen
// ---------------------------------------------------------------------
function vulVisuals(h) {
  const sectie = sectieVan(h);

  // Eén visual per begrip
  h.begrippen.forEach((b, i) => {
    if (!b.visual || !VISUALS[b.visual]) return;
    const plek = sectie.querySelector(`.begrip-stap[data-stap="${i}"] .visual-inhoud`);
    VISUALS[b.visual].maak(plek, b);
  });
}


// ---------------------------------------------------------------------
// 4. Navigatie
// ---------------------------------------------------------------------

// Het leerpad bijwerken: welke knop hoort bij wat je nu ziet
function werkLeerpadBij(huidigId) {
  document.querySelectorAll('.deel-knop').forEach(knop => {
    const isHuidig = knop.dataset.deel === huidigId;
    if (isHuidig) knop.setAttribute('aria-current', 'step'); else knop.removeAttribute('aria-current');
  });
  schuifInBeeld(document.getElementById('leerpad-rij'), document.querySelector(`.deel-knop[data-deel="${huidigId}"]`));
}

// De intropagina tonen
function toonIntro(opties = {}) {
  HOOFDSTUKKEN.forEach(h => { sectieVan(h).hidden = true; });
  introSectie().hidden = false;
  werkLeerpadBij('intro');

  // Geen deel in de link: wie de pagina opnieuw opent, ziet de intro
  try { history.replaceState(null, '', location.pathname + location.search); } catch (fout) { /* niet erg */ }

  if (opties.scroll) introSectie().scrollIntoView({ block: 'start', behavior: scrollGedrag });
}

// Een deel tonen. opties.stap kiest het begrip, opties.scroll scrolt erheen.
function toonHoofdstuk(id, opties = {}) {
  const h = vindDeel(id) || HOOFDSTUKKEN[0];

  introSectie().hidden = true;
  HOOFDSTUKKEN.forEach(ander => { sectieVan(ander).hidden = ander !== h; });

  werkLeerpadBij(h.id);

  try { history.replaceState(null, '', '#' + h.id); } catch (fout) { /* niet erg */ }

  toonStap(h, opties.stap ?? huidigeStap[h.id] ?? 0);

  if (opties.scroll) sectieVan(h).scrollIntoView({ block: 'start', behavior: scrollGedrag });
}

// Eén begrip binnen een deel tonen
function toonStap(h, index, opties = {}) {
  const sectie = sectieVan(h);
  huidigeStap[h.id] = index;

  // Alleen dit begrip zichtbaar
  sectie.querySelectorAll('.begrip-stap').forEach(stap => { stap.hidden = Number(stap.dataset.stap) !== index; });

  // Pillen bovenaan: welk begrip nu open staat
  sectie.querySelectorAll('.gids-pil').forEach(pil => {
    const isHuidig = Number(pil.dataset.stap) === index;
    if (isHuidig) pil.setAttribute('aria-current', 'step'); else pil.removeAttribute('aria-current');
  });

  // Knoppen onderaan
  const deelIndex = HOOFDSTUKKEN.indexOf(h);
  const vorigDeel = HOOFDSTUKKEN[deelIndex - 1];
  const volgendDeel = HOOFDSTUKKEN[deelIndex + 1];
  const isEerste = index === 0;
  const isLaatste = index === h.begrippen.length - 1;

  const vorige = sectie.querySelector('[data-nav="vorige"]');
  if (!isEerste) vorige.innerHTML = `${icoon('arrow-left')}Vorige`;
  else if (vorigDeel) vorige.innerHTML = `${icoon('arrow-left')}Vorig deel`;
  else vorige.innerHTML = `${icoon('arrow-left')}Intro`;

  const volgende = sectie.querySelector('[data-nav="volgende"]');
  if (!isLaatste) volgende.innerHTML = `Volgend begrip${icoon('arrow-right')}`;
  else if (volgendDeel) volgende.innerHTML = `Volgend deel: ${volgendDeel.kort}${icoon('arrow-right')}`;
  else volgende.innerHTML = `Terug naar het begin${icoon('rotate-ccw')}`;

  sectie.querySelector('.gids-teller').textContent = `${index + 1} / ${h.begrippen.length}`;
  tekenIconen();

  // Bij een nieuw begrip: de gids terug in beeld als je ver naar beneden stond
  if (opties.scroll) {
    const gids = sectie.querySelector('.gids');
    if (gids.getBoundingClientRect().top < 0) gids.scrollIntoView({ block: 'start', behavior: scrollGedrag });
  }
}

function volgende() {
  const h = zichtbaarDeel();
  if (!h) return toonHoofdstuk(HOOFDSTUKKEN[0].id, { stap: 0, scroll: true });   // vanaf de intro

  const index = huidigeStap[h.id] ?? 0;
  if (index < h.begrippen.length - 1) return toonStap(h, index + 1, { scroll: true });
  const volgendDeel = HOOFDSTUKKEN[HOOFDSTUKKEN.indexOf(h) + 1];
  if (volgendDeel) toonHoofdstuk(volgendDeel.id, { stap: 0, scroll: true });
  else toonIntro({ scroll: true });   // na het laatste deel: terug naar het begin
}

function vorige() {
  const h = zichtbaarDeel();
  if (!h) return;   // op de intro is er niets vóór

  const index = huidigeStap[h.id] ?? 0;
  if (index > 0) return toonStap(h, index - 1, { scroll: true });
  const vorigDeel = HOOFDSTUKKEN[HOOFDSTUKKEN.indexOf(h) - 1];
  if (vorigDeel) toonHoofdstuk(vorigDeel.id, { stap: vorigDeel.begrippen.length - 1, scroll: true });
  else toonIntro({ scroll: true });
}

// Een knop in een horizontale schuifbalk in beeld schuiven
function schuifInBeeld(rij, knop) {
  if (rij && knop) rij.scrollTo({ left: knop.offsetLeft - 16, behavior: scrollGedrag });
}


// ---------------------------------------------------------------------
// 5. Opstarten
// ---------------------------------------------------------------------
function start() {
  // Pagina opbouwen
  document.getElementById('leerpad-rij').innerHTML = leerpadHtml();
  const main = document.getElementById('hoofdstukken');
  main.insertAdjacentHTML('beforeend', introHtml());
  HOOFDSTUKKEN.forEach((h, index) => {
    main.insertAdjacentHTML('beforeend', deelHtml(h, index));
    vulVisuals(h);
  });

  // Klikken: leerpad, intro, pillen en vorige/volgende
  document.getElementById('leerpad-rij').addEventListener('click', event => {
    const knop = event.target.closest('.deel-knop');
    if (!knop) return;
    if (knop.dataset.deel === 'intro') toonIntro({ scroll: true });
    else toonHoofdstuk(knop.dataset.deel, { scroll: true });
  });
  main.addEventListener('click', event => {
    const naarDeel = event.target.closest('[data-naar-deel]');
    if (naarDeel) toonHoofdstuk(naarDeel.dataset.naarDeel, { stap: 0, scroll: true });
    const naarBegrip = event.target.closest('[data-naar-begrip]');
    if (naarBegrip) {
      const h = zichtbaarDeel();
      const index = h.begrippen.findIndex(b => b.id === naarBegrip.dataset.naarBegrip);
      if (index >= 0) toonStap(h, index, { scroll: true });
    }
    const pil = event.target.closest('.gids-pil');
    if (pil) toonStap(zichtbaarDeel(), Number(pil.dataset.stap), { scroll: true });
    const nav = event.target.closest('[data-nav]');
    if (nav) (nav.dataset.nav === 'volgende' ? volgende : vorige)();
  });

  // Pijltjestoetsen: vorig of volgend begrip (niet tijdens typen of in knoppengroepen)
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (event.target.closest('textarea, input, .segment, .acties')) return;
    (event.key === 'ArrowRight' ? volgende : vorige)();
  });

  // Begin bij het deel uit de link (#agent, #veiligheid, ...) of bij de intro
  const startId = location.hash.replace('#', '');
  if (vindDeel(startId)) toonHoofdstuk(startId, { scroll: true });
  else toonIntro();
  tekenIconen();
}

start();
