// =====================================================================
// HULPFUNCTIES EN REGISTERS
// Wordt als eerste geladen. Alle andere scripts gebruiken wat hier staat.
// =====================================================================


// ---------------------------------------------------------------------
// 1. Register voor visuals
// ---------------------------------------------------------------------

// Een visual hoort bij één begrip. Elk bestand in js/visuals/ voegt er
// zijn eigen visuals aan toe, zo:
//
//   VISUALS.naam = {
//     label: 'Probeer het',             // tekst boven het schema
//     icoon: 'mouse-pointer-click',     // Lucide-icoon naast die tekst
//     maak(el, begrip) { ... },         // vult het element el met het schema
//   };
//
// In inhoud.js koppel je ze aan een begrip met  visual: 'naam'.
const VISUALS = {};


// ---------------------------------------------------------------------
// 2. Iconen (Lucide)
// ---------------------------------------------------------------------

// Geeft de HTML voor een icoon; tekenIconen() zet ze om in echte SVG.
function icoon(naam) {
  return `<i data-lucide="${naam}" aria-hidden="true"></i>`;
}

function tekenIconen() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}


// ---------------------------------------------------------------------
// 3. Tekst
// ---------------------------------------------------------------------

// Maakt tekst veilig om in HTML te tonen (voor wat de gebruiker typt).
function veiligeTekst(tekst) {
  return tekst.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


// ---------------------------------------------------------------------
// 4. Beweging
// ---------------------------------------------------------------------

// Wie in het systeem "minder beweging" koos, krijgt geen animaties.
const minderBeweging = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollGedrag = minderBeweging ? 'auto' : 'smooth';

// Start een CSS-animatie opnieuw, ook als ze al eens liep.
function herstartAnimatie(element, klasse) {
  element.classList.remove(klasse);
  void element.offsetWidth;   // de browser even laten "vergeten"
  element.classList.add(klasse);
}
