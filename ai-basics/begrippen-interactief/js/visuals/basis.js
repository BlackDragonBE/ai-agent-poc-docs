// =====================================================================
// VISUALS · DEEL 1: DE BASIS
// taalmodel · aanbieder · prompt · tokens · context
// =====================================================================


// ---------------------------------------------------------------------
// Taalmodel: tekst gaat via een buis het model in, het model verwerkt,
// en het antwoord komt via een tweede buis naar buiten
// ---------------------------------------------------------------------
VISUALS.taalmodel = {
  label: 'Zo werkt het', icoon: 'eye',
  maak(el) {
    const ANTWOORD = 'Zoeken op “José” geeft geen resultaten, zonder accent wel. De zoekfunctie verwerkt accenten niet goed. Dat moet hersteld worden.';
    const LEEG = 'Nog geen antwoord.';
    const UITLEG_MODEL = 'voorspelt stukje voor stukje';

    // Een buis met drie "pakketjes" die erdoor stromen als de buis actief is
    const buisHtml = `<span class="io-buis" aria-hidden="true"><span class="pakketje"></span><span class="pakketje"></span><span class="pakketje"></span></span>`;

    el.innerHTML = `
      <div class="io-rij">
        <div class="io-blok io-in"><span class="eyebrow">Tekst erin</span><p>“Vat dit ticket samen in drie zinnen.”</p></div>
        ${buisHtml}
        <div class="io-model">${icoon('brain')}<strong>Taalmodel</strong><small>${UITLEG_MODEL}</small></div>
        ${buisHtml}
        <div class="io-blok io-uit-blok"><span class="eyebrow">Tekst eruit</span><p class="io-uit leeg">${LEEG}</p></div>
      </div>
      <button class="knop primair io-verzend" type="button">${icoon('send')}Verzenden naar LLM</button>`;

    // Onderdelen die we tijdens de animatie aanpassen
    const invoer = el.querySelector('.io-in');
    const [buisIn, buisUit] = el.querySelectorAll('.io-buis');
    const model = el.querySelector('.io-model');
    const modelUitleg = model.querySelector('small');
    const uitBlok = el.querySelector('.io-uit-blok');
    const uitvoer = el.querySelector('.io-uit');
    const knop = el.querySelector('.io-verzend');

    // Even wachten binnen een async functie
    const wacht = ms => new Promise(klaar => setTimeout(klaar, ms));

    // De hele reis: erin, verwerken, eruit
    async function verzend() {
      knop.disabled = true;
      uitvoer.classList.remove('leeg');
      uitvoer.textContent = '';

      // Zonder animaties: meteen het antwoord tonen
      if (minderBeweging) {
        uitvoer.textContent = ANTWOORD;
        knop.disabled = false;
        return;
      }

      // 1. De tekst stroomt door de eerste buis het model in
      invoer.classList.add('actief');
      buisIn.classList.add('actief');
      await wacht(1200);
      invoer.classList.remove('actief');
      invoer.classList.add('verzonden');
      buisIn.classList.remove('actief');

      // 2. Het model verwerkt de tekst
      model.classList.add('denkt');
      modelUitleg.textContent = 'aan het verwerken…';
      await wacht(1400);

      // 3. Het antwoord stroomt woord per woord door de tweede buis naar buiten
      modelUitleg.textContent = 'schrijft het antwoord…';
      buisUit.classList.add('actief');
      uitBlok.classList.add('actief');
      for (const woord of ANTWOORD.split(' ')) {
        uitvoer.insertAdjacentHTML('beforeend', `<span class="woord">${woord} </span>`);
        await wacht(110);
      }

      // Klaar: alles terug in rust
      buisUit.classList.remove('actief');
      uitBlok.classList.remove('actief');
      model.classList.remove('denkt');
      invoer.classList.remove('verzonden');
      modelUitleg.textContent = UITLEG_MODEL;
      knop.innerHTML = `${icoon('rotate-ccw')}Opnieuw verzenden`;
      tekenIconen();
      knop.disabled = false;
    }

    knop.addEventListener('click', verzend);
  },
};


// ---------------------------------------------------------------------
// AI-aanbieder: wie maakt het model, en waar kun je het gebruiken?
// ---------------------------------------------------------------------
const MAKERS_EN_AANBIEDERS = [
  {
    maker: 'Anthropic', model: 'Claude',
    aanbieders: [
      { naam: 'Anthropic', zelf: true },
      { naam: 'Amazon Bedrock', zelf: false },
      { naam: 'OpenRouter', zelf: false },
      { naam: 'GitHub Copilot', zelf: false },
    ],
  },
  {
    maker: 'OpenAI', model: 'GPT',
    aanbieders: [
      { naam: 'OpenAI', zelf: true },
      { naam: 'OpenRouter', zelf: false },
      { naam: 'GitHub Copilot', zelf: false },
    ],
  },
];

VISUALS.aanbieder = {
  label: 'Model ≠ aanbieder', icoon: 'eye',
  maak(el) {
    // Eén rij: maker → model → een of meer aanbieders
    const rijHtml = rij => `
      <div class="mk-rij">
        <div class="mk-maker">${icoon('factory')}<small>Maakt het model</small><strong>${rij.maker}</strong></div>
        <span class="mk-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <div class="mk-model">${icoon('brain')}<small>Model</small><strong>${rij.model}</strong></div>
        <span class="mk-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <ul class="mk-aanbieders" aria-label="Te gebruiken via">
          ${rij.aanbieders.map(a => `
            <li class="mk-aanbieder${a.zelf ? ' zelf' : ''}">
              ${icoon('building-2')}
              <span><strong>${a.naam}</strong><small>${a.zelf ? 'maker én aanbieder' : 'alleen aanbieder'}</small></span>
            </li>`).join('')}
        </ul>
      </div>`;

    el.innerHTML = `
      <div class="mk">${MAKERS_EN_AANBIEDERS.map(rijHtml).join('')}</div>
      <p class="mk-les">${icoon('lightbulb')}<span>Hetzelfde model kan bij meer dan één aanbieder te krijgen zijn. Claude via Amazon Bedrock is nog altijd Claude.</span></p>`;
  },
};


// ---------------------------------------------------------------------
// Prompt: wat het model echt krijgt = systeemprompt + jouw prompt
// De systeemprompt is eerst verborgen, zoals in een echte chat.
// ---------------------------------------------------------------------
const SYSTEEMPROMPT_DELEN = [
  { icoon: 'list-checks', soort: 'Instructies', tekst: '“Antwoord in het Nederlands, kort en duidelijk.”' },
  { icoon: 'smile', soort: 'Persoonlijkheid', tekst: '“Je bent een vriendelijke, behulpzame assistent.”' },
  { icoon: 'shield', soort: 'Regels', tekst: '“Geef geen persoonlijke gegevens van klanten door.”' },
  { icoon: 'info', soort: 'Achtergrond', tekst: '“Vandaag is het donderdag. De gebruiker werkt bij de klantendienst.”' },
];

VISUALS.prompt = {
  label: 'Wat krijgt het model echt?', icoon: 'eye',
  maak(el) {
    el.innerHTML = `
      <div class="pr">
        <div class="pr-systeem" hidden>
          <p class="eyebrow">${icoon('scroll-text')}Systeemprompt · eerst, van de software</p>
          <ul class="pr-lijst">
            ${SYSTEEMPROMPT_DELEN.map(deel => `
              <li>${icoon(deel.icoon)}<span><strong>${deel.soort}</strong>${deel.tekst}</span></li>`).join('')}
          </ul>
        </div>
        <div class="pr-verborgen">${icoon('eye-off')}<span>Hier staat nog iets wat je niet ziet…</span></div>
        <span class="pr-plus" aria-hidden="true">+</span>
        <div class="pr-jij">
          <p class="eyebrow">${icoon('user-round')}Jouw prompt</p>
          <p>“Vat dit ticket samen in drie zinnen.”</p>
        </div>
        <span class="pr-pijl" aria-hidden="true">${icoon('arrow-down')}</span>
        <div class="pr-model">${icoon('brain')}<strong>Taalmodel</strong><small>leest alles samen, systeemprompt eerst</small></div>
      </div>
      <button class="knop primair pr-knop" type="button" aria-expanded="false">${icoon('eye')}Toon de systeemprompt</button>`;

    const systeem = el.querySelector('.pr-systeem');
    const verborgen = el.querySelector('.pr-verborgen');
    const knop = el.querySelector('.pr-knop');

    knop.addEventListener('click', () => {
      const tonen = systeem.hidden;
      systeem.hidden = !tonen;
      verborgen.hidden = tonen;
      knop.setAttribute('aria-expanded', String(tonen));
      knop.innerHTML = tonen ? `${icoon('eye-off')}Verberg de systeemprompt` : `${icoon('eye')}Toon de systeemprompt`;
      tekenIconen();
    });
  },
};


// ---------------------------------------------------------------------
// Token: typ een zin en zie de tokens
// We gebruiken een echte tokenizer: o200k_base van OpenAI (GPT-4o), uit
// de bibliotheek gpt-tokenizer (versie 3.4.0, MIT-licentie). Het bestand
// staat in js/lib/, zodat het ook zonder internet werkt. Het wordt pas
// geladen als je dit begrip opent (het is 2 MB groot). Lukt het laden
// niet, dan valt het schema terug op een benadering.
// ---------------------------------------------------------------------
const TOKENIZER_URL = 'js/lib/gpt-tokenizer-o200k_base.js';
let tokenizerBelofte = null;   // zodat we het script maar één keer laden

function laadTokenizer() {
  if (!tokenizerBelofte) {
    tokenizerBelofte = new Promise((klaar, mislukt) => {
      const script = document.createElement('script');
      script.src = TOKENIZER_URL;
      script.onload = () => {
        if (window.GPTTokenizer_o200k_base) klaar(window.GPTTokenizer_o200k_base);
        else mislukt(new Error('Tokenizer niet gevonden'));
      };
      script.onerror = () => mislukt(new Error('Tokenizer kon niet laden'));
      document.head.appendChild(script);
    });
  }
  return tokenizerBelofte;
}

// De bytes van één token. De woordenlijst van de tokenizer bewaart per
// token-nummer een stukje tekst, of losse bytes als het geen hele letter is.
function tokenBytes(tokenizer, id) {
  const waarde = tokenizer.bytePairEncodingCoreProcessor.bytePairRankDecoder[id];
  return typeof waarde === 'string' ? new TextEncoder().encode(waarde) : Uint8Array.from(waarde);
}

// Tekst → tokens met de echte tokenizer.
// Elk token krijgt zijn tekst en zijn nummer (ID) in de woordenlijst van het model.
function echteTokens(tokenizer, tekst) {
  const ids = tokenizer.encode(tekst);
  const strengeDecoder = new TextDecoder('utf-8', { fatal: true });   // geeft een fout bij een halve letter
  const tokens = [];
  let bufferIds = [];
  let bufferBytes = [];

  ids.forEach((id, index) => {
    bufferIds.push(id);
    bufferBytes.push(...tokenBytes(tokenizer, id));

    // Een teken zoals een emoji kan over meerdere tokens verdeeld zijn.
    // Is de letter nog niet compleet, dan nemen we het volgende token erbij.
    let stuk;
    try {
      stuk = strengeDecoder.decode(Uint8Array.from(bufferBytes));
    } catch (halveLetter) {
      if (index < ids.length - 1) return;
      stuk = new TextDecoder().decode(Uint8Array.from(bufferBytes));   // laatste token: toon wat er is
    }
    tokens.push({ tekst: stuk, ids: bufferIds });
    bufferIds = [];
    bufferBytes = [];
  });
  return { tokens, aantal: ids.length };
}

// Reserve als de echte tokenizer niet laadt: een eenvoudige benadering.
// Woorddelen die we herkennen, langste eerst.
const BEKENDE_DELEN = ['instructie', 'herstel', 'functie', 'bestand', 'context', 'venster', 'project', 'sorter', 'wijzig', 'agent', 'zoek', 'test']
  .sort((a, b) => b.length - a.length);

function splitsWoord(woord) {
  if (woord.length <= 6) return [woord];
  const klein = woord.toLowerCase();
  for (const deel of BEKENDE_DELEN) {
    if (klein === deel) return [woord];
    if (klein.startsWith(deel)) {
      return [woord.slice(0, deel.length), ...splitsWoord(woord.slice(deel.length))];
    }
  }
  // Onbekend lang woord: knip in stukjes van vier letters
  return [woord.slice(0, 4), ...splitsWoord(woord.slice(4))];
}

function benaderdeTokens(tekst) {
  const stukken = tekst.match(/\s*[\p{L}\p{N}]+|\s*[^\s\p{L}\p{N}]|\s+/gu) || [];
  const tokens = [];
  stukken.forEach(stuk => {
    const spatie = stuk.match(/^\s*/)[0];
    const kern = stuk.slice(spatie.length);
    if (/^[\p{L}\p{N}]+$/u.test(kern)) {
      splitsWoord(kern).forEach((deel, i) => tokens.push({ tekst: (i === 0 ? spatie : '') + deel, ids: [] }));
    } else {
      tokens.push({ tekst: stuk, ids: [] });
    }
  });
  return { tokens, aantal: tokens.length };
}

VISUALS.tokens = {
  label: 'Probeer het', icoon: 'mouse-pointer-click',
  maak(el) {
    el.innerHTML = `
      <div class="veld">
        <label for="token-invoer">Jouw prompt</label>
        <textarea id="token-invoer" rows="2">Herstel de zoekfunctie, maar wijzig de sortering niet.</textarea>
      </div>
      <div class="voorbeeld-rij" role="group" aria-label="Voorbeelden">
        <span class="noot">Probeer:</span>
        <button class="chip" type="button" data-tekst="kat" data-antwoord="Bedoel je het dier? Wat wil je weten over katten?">kat</button>
        <button class="chip" type="button" data-tekst="zoekfunctie" data-antwoord="Welke zoekfunctie bedoel je? Ik kan de code bekijken.">zoekfunctie</button>
        <button class="chip" type="button" data-tekst="const totaal = prijs * 2;" data-antwoord="Deze regel bewaart het dubbele van prijs in totaal.">const totaal = prijs * 2;</button>
        <button class="chip" type="button" data-tekst="Fix the search function, but do not change the sorting." data-antwoord="Done: search now ignores accents. The sorting is unchanged.">in het Engels</button>
      </div>
      <div class="tokens" aria-label="Tokens"></div>
      <div class="teller">
        <span><span class="groot" data-veld="tokens">0</span> <span class="label">tokens</span></span>
        <span class="label"><span data-veld="tekens">0</span> tekens</span>
        <span class="label"><span data-veld="woorden">0</span> woorden</span>
        <button class="chip tok-nummers" type="button" aria-pressed="false" hidden>${icoon('hash')}Toon token-nummers</button>
      </div>
      <p class="noot tokenizer-bron" style="margin-top:6px">Echte tokenizer laden…</p>
      <div class="tk-io">
        <div class="tk-io-blok">
          <small>Invoer</small>
          <strong data-veld="invoer"></strong>
          <span class="noot">Jouw prompt. In een agent ook de systeemprompt, het gesprek en gelezen bestanden.</span>
        </div>
        <span class="tk-io-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <span class="tk-io-model" title="Taalmodel">${icoon('brain')}</span>
        <span class="tk-io-pijl" aria-hidden="true">${icoon('arrow-right')}</span>
        <div class="tk-io-blok uit">
          <small>Uitvoer</small>
          <strong data-veld="uitvoer"></strong>
          <span class="noot tk-io-antwoord"></span>
        </div>
      </div>
      <p class="noot tk-io-kosten">${icoon('coins')}Allebei tellen mee voor de kosten. Een uitvoertoken kost meestal meer dan een invoertoken.</p>`;

    const invoer = el.querySelector('textarea');
    const nummerKnop = el.querySelector('.tok-nummers');
    const bron = el.querySelector('.tokenizer-bron');
    let tokenizer = null;        // de echte tokenizer, zodra die geladen is
    let toonNummers = false;
    // Het antwoord van het model bij het eerste voorbeeld; bij eigen tekst een algemeen antwoord
    let antwoord = 'Klaar: zoeken negeert nu accenten. De sortering is niet gewijzigd.';

    // Tokens tekenen: met de echte tokenizer als die er is, anders de benadering
    function teken() {
      const resultaat = tokenizer ? echteTokens(tokenizer, invoer.value) : benaderdeTokens(invoer.value);
      el.querySelector('.tokens').innerHTML = resultaat.tokens.map(token => {
        const html = veiligeTekst(token.tekst)
          .replace(/^ +/, spaties => `<span class="spatie">${'·'.repeat(spaties.length)}</span>`)
          .replace(/\n/g, '<span class="spatie">↵</span>');
        const nummer = token.ids.join(' ');
        const titel = nummer ? ` title="Token-nummer ${nummer}"` : '';
        const nummerHtml = toonNummers && nummer ? `<small class="tok-id">${nummer}</small>` : '';
        return `<span class="tok"${titel}>${html}${nummerHtml}</span>`;
      }).join('');
      el.querySelector('[data-veld="tokens"]').textContent = resultaat.aantal;
      el.querySelector('[data-veld="tekens"]').textContent = invoer.value.length;

      // Woorden: reeksen letters of cijfers ("don't" en "e-mail" tellen als één woord)
      const woorden = invoer.value.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || [];
      el.querySelector('[data-veld="woorden"]').textContent = woorden.length;

      // Invoer en uitvoer: het antwoord tellen we met dezelfde tokenizer
      const uitvoer = tokenizer ? echteTokens(tokenizer, antwoord) : benaderdeTokens(antwoord);
      const aantalTokens = n => `${n} ${n === 1 ? 'token' : 'tokens'}`;
      el.querySelector('[data-veld="invoer"]').textContent = aantalTokens(resultaat.aantal);
      el.querySelector('[data-veld="uitvoer"]').textContent = aantalTokens(uitvoer.aantal);
      el.querySelector('.tk-io-antwoord').textContent = `“${antwoord}”`;
    }

    // De echte tokenizer pas laden als dit schema voor het eerst in beeld komt
    function startLaden() {
      laadTokenizer()
        .then(geladen => {
          tokenizer = geladen;
          nummerKnop.hidden = false;
          bron.textContent = 'Echte tokenizer van OpenAI (o200k_base, onder andere gebruikt door GPT-4o). Claude en andere modellen knippen tekst op hun eigen manier, dus daar kan het aantal wat verschillen.';
          teken();
        })
        .catch(() => {
          bron.textContent = 'De echte tokenizer kon niet laden. Je ziet nu een benadering.';
        });
    }
    if ('IntersectionObserver' in window) {
      const waarnemer = new IntersectionObserver(items => {
        if (items.some(item => item.isIntersecting)) { waarnemer.disconnect(); startLaden(); }
      });
      waarnemer.observe(el);
    } else {
      startLaden();
    }

    // Bediening
    invoer.addEventListener('input', () => {
      antwoord = 'Oké, daar ga ik mee aan de slag.';
      teken();
    });
    el.querySelectorAll('[data-tekst]').forEach(knop => knop.addEventListener('click', () => {
      invoer.value = knop.dataset.tekst;
      antwoord = knop.dataset.antwoord;
      teken();
    }));
    nummerKnop.addEventListener('click', () => {
      toonNummers = !toonNummers;
      nummerKnop.setAttribute('aria-pressed', String(toonNummers));
      teken();
    });

    teken();
  },
};


// ---------------------------------------------------------------------
// Context en contextvenster: wat ziet het model?
// Links het venster (wat het model ziet), rechts wat erbuiten ligt.
// Lees iets in en stel dan de vraag: het model kan alleen antwoorden
// met wat in het venster zit. Hoe het venster volloopt, staat in deel 5.
// ---------------------------------------------------------------------
const CONTEXT_VENSTER = 200000;   // een gangbare grootte, als voorbeeld

// Wat er altijd al in het venster zit
const CONTEXT_VAST = [
  { icoon: 'scroll-text', naam: 'Systeemprompt', tokens: 3000 },
  { icoon: 'user-round', naam: 'Jouw vraag: “Wat doet zoekfunctie.ts?”', tokens: 10 },
];

// Wat er buiten het venster ligt. "kanNiet": dit kan de agent niet inlezen.
const CONTEXT_BUITEN = [
  { id: 'code', icoon: 'file-code', naam: 'zoekfunctie.ts', soort: 'Bestand op je computer', tokens: 1200 },
  { id: 'readme', icoon: 'file-text', naam: 'README.md', soort: 'Bestand op je computer', tokens: 2500 },
  { id: 'web', icoon: 'globe', naam: 'Documentatie', soort: 'Website', tokens: 8000 },
  { id: 'gisteren', icoon: 'history', naam: 'Je gesprek van gisteren', soort: 'Vorige sessie', kanNiet: true },
];

VISUALS.context = {
  label: 'Probeer het: wat ziet het model?', icoon: 'mouse-pointer-click',
  maak(el) {
    let ingelezen = [];   // id's van wat de agent al heeft ingelezen

    el.innerHTML = `
      <div class="cz">
        <section class="cz-venster" aria-label="Het contextvenster">
          <p class="cz-kop">${icoon('eye')}<strong>Dit ziet het model</strong><span class="cz-teller"></span></p>
          <ul class="cz-inhoud"></ul>
          <div class="cz-balk" aria-hidden="true"><span></span></div>
        </section>
        <section class="cz-buiten" aria-label="Buiten de context">
          <p class="cz-kop">${icoon('eye-off')}<strong>Dit ziet het model niet</strong></p>
          <ul class="cz-lijst">
            ${CONTEXT_BUITEN.map(ding => `
              <li data-ding="${ding.id}">
                <span class="ti">${icoon(ding.icoon)}</span>
                <span><strong>${ding.naam}</strong><small>${ding.soort}</small></span>
                <button class="chip" type="button" data-lees="${ding.id}">${icoon('arrow-left')}Inlezen</button>
              </li>`).join('')}
          </ul>
        </section>
      </div>
      <div class="cz-onder">
        <div class="knoppen">
          <button class="knop primair" type="button" data-actie="vraag">${icoon('send')}Stel de vraag</button>
          <button class="knop" type="button" data-actie="opnieuw" hidden>${icoon('rotate-ccw')}Opnieuw</button>
        </div>
        <div class="cz-antwoord" hidden><span class="agent-i">${icoon('brain')}</span><p></p></div>
      </div>
      <p class="status let-op cz-melding" hidden></p>`;

    const antwoord = el.querySelector('.cz-antwoord');
    const melding = el.querySelector('.cz-melding');

    // Het venster opnieuw tekenen. "nieuwId" is wat net binnenkwam.
    function teken(nieuwId) {
      const inVenster = [...CONTEXT_VAST, ...CONTEXT_BUITEN.filter(ding => ingelezen.includes(ding.id))];
      el.querySelector('.cz-inhoud').innerHTML = inVenster.map(ding => `
        <li class="${ding.id && ding.id === nieuwId ? 'nieuw' : ''}">
          ${icoon(ding.icoon)}<span>${ding.naam}</span><small>${ding.tokens.toLocaleString('nl-BE')} tokens</small>
        </li>`).join('');

      // Teller en balkje: hoeveel van het venster is gebruikt?
      const totaal = inVenster.reduce((som, ding) => som + ding.tokens, 0);
      el.querySelector('.cz-teller').textContent = `${totaal.toLocaleString('nl-BE')} van ${CONTEXT_VENSTER.toLocaleString('nl-BE')} tokens`;
      el.querySelector('.cz-balk span').style.width = `${(totaal / CONTEXT_VENSTER) * 100}%`;

      // Wat al binnen is, staat grijs in de lijst rechts
      el.querySelectorAll('[data-ding]').forEach(rij => {
        const binnen = ingelezen.includes(rij.dataset.ding);
        rij.classList.toggle('gelezen', binnen);
        const knop = rij.querySelector('[data-lees]');
        knop.disabled = binnen;
        knop.innerHTML = binnen ? `${icoon('eye')}In de context` : `${icoon('arrow-left')}Inlezen`;
      });
      el.querySelector('[data-actie="opnieuw"]').hidden = ingelezen.length === 0;
      tekenIconen();
    }

    // Iets inlezen: het schuift het venster in
    el.addEventListener('click', event => {
      const knop = event.target.closest('[data-lees]');
      if (!knop) return;
      const ding = CONTEXT_BUITEN.find(d => d.id === knop.dataset.lees);
      antwoord.hidden = true;

      // Een vorig gesprek kan niet zomaar terug in de context
      if (ding.kanNiet) {
        melding.innerHTML = `${icoon('history')}<span>Dat gesprek is voorbij en zit niet in deze context. Het model weet er niets meer van. <button class="link-knop" type="button" data-naar-deel="sessies">Hoe je dat oplost: deel 5${icoon('arrow-right')}</button></span>`;
        melding.hidden = false;
        herstartAnimatie(melding, 'nieuw');
        tekenIconen();
        return;
      }
      melding.hidden = true;
      ingelezen.push(ding.id);
      teken(ding.id);
    });

    // De vraag stellen: het antwoord hangt af van wat in het venster zit
    el.querySelector('[data-actie="vraag"]').addEventListener('click', () => {
      const kentCode = ingelezen.includes('code');
      antwoord.classList.toggle('raak', kentCode);
      antwoord.classList.toggle('mis', !kentCode);
      antwoord.querySelector('p').innerHTML = kentCode
        ? 'In <code>zoekfunctie.ts</code> zie ik <code>k.naam.includes(zoekterm)</code>: het zoekt klanten op naam. Let op: “José” en “Jose” tellen als verschillend.'
        : 'Ik zie geen <code>zoekfunctie.ts</code> in mijn context, dus ik kan alleen gokken. Lees het bestand eerst in.';
      antwoord.hidden = false;
      herstartAnimatie(antwoord, 'nieuw');
    });

    // Opnieuw beginnen
    el.querySelector('[data-actie="opnieuw"]').addEventListener('click', () => {
      ingelezen = [];
      antwoord.hidden = true;
      melding.hidden = true;
      teken();
    });

    teken();
  },
};
