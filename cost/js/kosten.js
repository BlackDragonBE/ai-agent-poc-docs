/* De prijzen en rekenregels staan in gegevens.js; dit bestand bedient de pagina. */
(() => {
  'use strict';
  const data = window.KOSTEN;
  const find = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const moneyFormats = new Map();
  const numberFormat = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 3 });
  let annual = false;
  let copilotId = 'free-business';
  let selectedProduct = data.plans[0];
  let benchmarkId = 'anthropic';

  function money(value, currency = 'USD', precise = false) {
    const key = `${currency}-${precise}`;
    if (!moneyFormats.has(key)) moneyFormats.set(key, new Intl.NumberFormat('nl-NL', {
      style: 'currency', currency, currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: precise ? 2 : 0, maximumFractionDigits: precise ? 4 : 2,
    }));
    return moneyFormats.get(key).format(value);
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function readNumber(id) {
    const input = find(`#${id}`);
    const valid = input.value !== '' && input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    if (!valid) throw new RangeError('Vul geldige aantallen in. Gebruikers: 1–10.000, hele getallen. Gebruik en tokens: 0–1.000.000.');
    return input.valueAsNumber;
  }

  function showError(id, error) {
    const target = find(`#${id}`);
    target.textContent = error ? error.message : '';
    target.hidden = !error;
  }

  function announce(text) { find('#melding').textContent = text; }

  function sourceLinks(container, sourceIds) {
    container.replaceChildren();
    if (sourceIds.length) container.append(element('span', '', 'Bronnen:'));
    for (const id of sourceIds) {
      const source = data.sources.find(item => item.id === id);
      const link = element('a', '', `[${id}] ↗`);
      link.href = source.url;
      link.title = source.title;
      link.setAttribute('aria-label', `Bron ${id}: ${source.title}`);
      container.append(link);
    }
  }

  // Gewone navigatieknoppen werken ook met toetsenbord, terugknop en deelbare URL's.
  function chooseView(id, updateAddress = true, focusHeading = false) {
    if (!['instap', 'plannen', 'modellen', 'bewijs'].includes(id)) id = 'instap';
    all('.paneel').forEach(panel => { panel.hidden = panel.id !== id; });
    all('[data-view]').forEach(button => {
      if (button.dataset.view === id) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    if (updateAddress && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    const heading = find(`#${id} h2`);
    if (focusHeading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    if (updateAddress) window.scrollTo({ top: 0, behavior: 'instant' });
    announce(heading.textContent);
  }

  all('[data-view]').forEach(button => button.addEventListener('click', () => chooseView(button.dataset.view)));
  all('[data-open-view]').forEach(button => button.addEventListener('click', () => chooseView(button.dataset.openView, true, true)));
  window.addEventListener('popstate', () => chooseView(location.hash.slice(1), false));
  window.addEventListener('hashchange', () => chooseView(location.hash.slice(1), false));

  // Eén kaartopbouw; een persoonlijk Lurus-plan krijgt geen fictief organisatietotaal.
  function renderPlans() {
    const grid = find('#prijskaarten');
    try {
      const seats = readNumber('teamgrootte');
      find('#instap-samenvatting').textContent = `${seats} ${seats === 1 ? 'gebruiker' : 'gebruikers'} · ${annual ? 'jaarbetaling waar beschikbaar' : 'maandbetaling'} — pas scenario aan`;
      showError('instap-fout', null);
      grid.replaceChildren();
      for (const plan of data.plans) grid.append(priceCard(plan, data.quotePlan(plan.id, seats, annual), seats));
      grid.append(priceCard(data.lurus));
    } catch (error) {
      grid.replaceChildren();
      showError('instap-fout', error);
    }
  }

  function priceCard(product, quote = null, seats = null) {
    const personal = product.id === 'lurus';
    const currency = personal ? 'EUR' : product.currency;
    const rate = personal ? product.subscriptions[0].monthly : quote.rate;
    const card = element('article', 'prijskaart');
    card.dataset.agent = product.id;
    const header = element('header');
    const mark = element('span', 'monogram', product.mark);
    mark.setAttribute('aria-hidden', 'true');
    header.append(mark, element('h3', '', product.name));
    const price = element('p', 'prijs');
    price.append(element('strong', 'bedrag', money(rate, currency)),
      element('span', '', personal ? '/ persoon / maand' : '/ seat / maand'));
    const annualAvailable = !personal && quote.annualAvailable;
    const rateNote = annual && annualAvailable ? 'Bij jaarbetaling' : (annual ? 'Maandtarief · geen bevestigd jaaraanbod' : 'Maandbetaling');
    const total = element('div', 'kaart-regel');
    if (personal) {
      total.append(element('strong', '', 'Persoonlijk · geen teambeheer'),
        element('span', '', product.subscriptions.slice(1).map(subscription => `${subscription.name} ${money(subscription.monthly, currency)}`).join(' · ') + ' per maand'));
    } else {
      total.append(element('strong', '', `${money(quote.fixed, currency)} vast / maand`));
      const totalNote = quote.yearlyCommitment !== null
        ? `${quote.billedSeats} plaatsen · ${money(quote.yearlyCommitment, currency)} vooraf / jaar`
        : `${quote.billedSeats} ${quote.billedSeats === 1 ? 'plaats' : 'plaatsen'} · ${product.tag}`;
      total.append(element('span', '', totalNote));
      if (quote.billedSeats > seats) total.append(element('span', '', `Minimum ${quote.billedSeats} betaalde plaatsen, ook bij ${seats} gebruiker.`));
    }
    const included = element('div', 'kaart-regel');
    included.append(element('strong', '', 'Inbegrepen'),
      element('span', '', personal ? product.subscriptions[0].included : product.included));
    const extra = element('div', 'kaart-regel');
    extra.append(element('strong', '', 'Daarbovenop'),
      element('span', '', personal ? 'Extra gebruik apart. Team werkt met een betaalde wallet, zonder seatvergoeding of Pro-abonnement per lid.' : product.extra));
    card.append(header, element('p', 'badge', personal ? 'Lurus Pro · persoonlijk' : product.route), price,
      element('p', 'prijs-uitleg', rateNote), total, included, extra, productButton(product));
    return card;
  }

  function productButton(product) {
    const button = element('button', 'detail-knop', 'Plannen & beheer →');
    button.type = 'button';
    button.setAttribute('aria-label', `Plannen en beheer voor ${product.name}`);
    button.addEventListener('click', () => {
      chooseProduct(product.id);
      chooseView('plannen', true, true);
    });
    return button;
  }

  // Elk product is even bereikbaar. De uitgebreidere Copilot-rekenhulp blijft daarbinnen.
  function chooseProduct(id) {
    selectedProduct = id === 'lurus' ? data.lurus : data.plans.find(product => product.id === id);
    all('[data-product]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.product === id)));
    const isCopilot = id === 'copilot';
    find('#product-copilot').hidden = !isCopilot;
    find('#product-dossier').hidden = isCopilot;
    if (!isCopilot) {
      const guide = data.planGuides[id];
      find('#product-titel').textContent = selectedProduct.name;
      find('#product-beheer').textContent = guide.management;
      find('#product-tabeltitel').textContent = `${selectedProduct.name}: betaalroutes en beheer`;
      const rows = find('#product-planregels');
      rows.replaceChildren();
      for (const option of guide.rows) {
        const row = element('tr');
        const name = element('th', '', option.name);
        name.scope = 'row';
        row.append(name,
          element('td', '', typeof option.monthly === 'number' ? money(option.monthly, guide.currency) : option.monthly),
          element('td', '', typeof option.annual === 'number' ? money(option.annual, guide.currency) : (option.annual ?? '—')),
          element('td', '', option.note));
        rows.append(row);
      }
      const sources = find('#product-bronnen');
      sources.replaceChildren();
      sourceLinks(sources, selectedProduct.sources);
    }
    announce(`Plannen en beheer voor ${selectedProduct.name}`);
  }

  all('[data-product]').forEach(button => button.addEventListener('click', () => chooseProduct(button.dataset.product)));
  find('#product-voorwaarden').addEventListener('click', () => openPlan(selectedProduct));

  find('#omp-details').addEventListener('click', () => openPlan(data.omp));

  function openPlan(plan) {
    find('#detailtitel').textContent = plan.name;
    const content = find('#detailinhoud');
    content.replaceChildren(element('p', 'subtitel', plan.route));
    for (const detail of plan.details) {
      const section = element('section');
      section.append(element('h3', '', detail.title), element('p', '', detail.text));
      content.append(section);
    }
    const links = element('div', 'bron-links');
    sourceLinks(links, plan.sources);
    content.append(links);
    const report = element('a', '', 'Alle bevindingen en onderliggende bronnen ↗');
    report.href = 'README.md';
    content.append(report);
    find('#detaildialoog').showModal();
  }

  find('#teamgrootte').addEventListener('input', renderPlans);
  all('[data-annual]').forEach(button => button.addEventListener('click', () => {
    annual = button.dataset.annual === 'true';
    all('[data-annual]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderPlans();
    announce(annual ? 'Jaarprijzen waar gepubliceerd. Overige kaarten behouden hun maandtarief.' : 'Maandprijzen geselecteerd.');
  }));

  // Eerst vereisten filteren; daarna alle passende combinaties met hetzelfde scenario vergelijken.
  function renderCopilot() {
    const comparison = find('#copilot-vergelijking');
    const details = find('#copilot-details');
    const includeSales = find('#copilot-sales').checked;
    find('#copilot-onbevestigd').hidden = !includeSales;
    try {
      const users = readNumber('aantal-gebruikers');
      const usage = readNumber('ai-gebruik');
      const required = all('[data-copilot-feature]:checked').map(input => input.dataset.copilotFeature);
      const billing = find('#copilot-betaling').value;
      const matches = data.copilot.filter(option =>
        (includeSales || !option.eligibleOnly) &&
        required.every(feature => option.features[feature] === true) &&
        (billing === 'any' || (billing === 'included' ? option.creditPerSeat > 0 : option.creditPerSeat === 0))
      );
      const columns = matches.map(option => ({ option, quote: data.quoteCopilot(option.id, users, usage) }));
      columns.sort((left, right) => left.quote.total - right.quote.total);
      showError('copilot-fout', null);
      comparison.hidden = columns.length === 0;
      details.hidden = columns.length === 0;
      find('#copilot-geen').hidden = columns.length !== 0;
      find('#copilot-matches').textContent = `${columns.length} passende ${columns.length === 1 ? 'combinatie' : 'combinaties'} · ${includeSales ? 'inclusief beperkt verkrijgbare routes' : 'reguliere routes'}`;
      find('#copilot-gebruik-samenvatting').textContent = `AI-gebruik: ${money(usage)} per persoon / maand — pas aan`;
      all('[data-usage]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.usage) === usage)));
      if (columns.length === 0) {
        copilotId = null;
        details.open = false;
        return;
      }
      if (!columns.some(column => column.option.id === copilotId)) copilotId = columns[0].option.id;
      renderCopilotComparison(columns, required, users, usage);
      const selected = columns.find(column => column.option.id === copilotId);
      renderCopilotBreakdown(selected.option, selected.quote);
    } catch (error) {
      comparison.hidden = true;
      details.hidden = true;
      find('#copilot-geen').hidden = true;
      find('#copilot-matches').textContent = 'Vul geldige aantallen in om de prijzen te vergelijken.';
      showError('copilot-fout', error);
    }
  }

  function renderCopilotComparison(columns, required, users, usage) {
    find('#copilot-vergelijk-titel').textContent = `${users} ${users === 1 ? 'gebruiker' : 'gebruikers'} · ${money(usage)} AI-gebruik per persoon / maand. Laagste scenariokosten eerst.`;
    const header = element('tr');
    const corner = element('th', '', 'Vergelijk');
    corner.scope = 'col';
    header.append(corner);
    for (const { option } of columns) {
      const cell = element('th', option.id === copilotId ? 'copilot-gekozen' : '');
      cell.scope = 'col';
      const button = element('button', 'chip copilot-plan-knop');
      button.type = 'button';
      button.dataset.copilot = option.id;
      button.setAttribute('aria-pressed', String(option.id === copilotId));
      button.setAttribute('aria-controls', 'copilot-details');
      button.append(element('strong', '', option.name), element('span', '', 'Bekijk berekening ↓'));
      button.addEventListener('click', () => {
        copilotId = option.id;
        renderCopilot();
        const details = find('#copilot-details');
        details.open = true;
        details.querySelector('summary').focus();
      });
      cell.append(button, element('span', 'copilot-beschikbaarheid', option.eligibleOnly ? 'Via accountteam · toelating vereist' : 'Reguliere aanschaf'));
      header.append(cell);
    }
    find('#copilot-matrix-kop').replaceChildren(header);
    const body = find('#copilot-matrix-regels');
    body.replaceChildren();
    function addRow(label, renderCell, className = '') {
      const row = element('tr', className);
      const title = element('th', '', label);
      title.scope = 'row';
      row.append(title);
      for (const column of columns) {
        const cell = element('td', column.option.id === copilotId ? 'copilot-gekozen' : '');
        renderCell(cell, column);
        row.append(cell);
      }
      body.append(row);
    }
    addRow(`Totaal / maand · ${users} ${users === 1 ? 'gebruiker' : 'gebruikers'}`, (cell, { quote }) => {
      cell.append(element('strong', 'copilot-scenarioprijs', money(quote.total)));
    }, 'copilot-totaalrij');
    addRow('Vast / persoon / maand', (cell, { option }) => {
      cell.append(element('strong', '', money(option.platformRate + option.seatRate)),
        element('small', '', `GitHub ${money(option.platformRate)} + Copilot ${money(option.seatRate)}`));
    });
    addRow('AI-tegoed / persoon / maand', (cell, { option }) => {
      cell.textContent = option.creditPerSeat ? money(option.creditPerSeat) + ' · gepoold' : 'Geen · alle gebruik apart';
    });
    // Gelijke, niet-gevraagde functies weglaten; verschillen en gekozen vereisten zichtbaar houden.
    for (const feature of data.copilotFeatures) {
      const firstValue = columns[0].option.features[feature.id];
      if (!required.includes(feature.id) && columns.every(column => column.option.features[feature.id] === firstValue)) continue;
      addRow(feature.name, (cell, { option }) => {
        const value = option.features[feature.id];
        cell.append(element('span', value === true ? 'functie-ja' : 'functie-nee',
          value === true ? 'Inbegrepen' : (value === false ? 'Niet inbegrepen' : 'Te bevestigen')));
      });
    }
  }

  function renderCopilotBreakdown(option, quote) {
    find('#copilot-details-samenvatting').textContent = `${option.name} — berekening & beheer`;
    find('#copilot-resultaat-titel').textContent = option.name;
    find('#copilot-totaal').textContent = money(quote.total);
    find('#kosten-platform').textContent = money(quote.platform);
    find('#kosten-seats').textContent = money(quote.licenses);
    find('#kosten-over').textContent = money(quote.overage);
    find('#copilot-tegoed').textContent = `${money(quote.usage)} aangenomen AI-gebruik, ${money(quote.included)} inbegrepen tegoed. ${option.creditPerSeat ? 'Alleen het meerdere wordt toegevoegd; ongebruikt tegoed wordt niet terugbetaald of doorgeschoven.' : 'Geen inbegrepen credits: al dit gemeten gebruik komt op de rekening.'}`;
    const eligibility = find('#copilot-toelating');
    eligibility.hidden = !option.eligibleOnly;
    eligibility.textContent = option.eligibleOnly ? `Niet algemeen als selfservice te kopen. ${option.note}` : '';
    find('#copilot-identiteit').textContent = option.identity;
    find('#copilot-beheer').textContent = option.management;
  }

  for (const feature of data.copilotFeatures) {
    const label = element('label', 'copilot-functie');
    const input = element('input');
    input.type = 'checkbox';
    input.dataset.copilotFeature = feature.id;
    const text = element('span');
    text.append(element('strong', '', feature.name), element('small', '', feature.description));
    label.append(input, text);
    find('#copilot-functies').append(label);
  }
  sourceLinks(find('#copilot-bronnen'), [7, 8, 9, 10, 24, 26, 27, 28]);
  find('#copilot-form').addEventListener('submit', event => event.preventDefault());
  find('#copilot-keuze-layout').addEventListener('input', renderCopilot);
  all('[data-usage]').forEach(button => button.addEventListener('click', () => {
    find('#ai-gebruik').value = button.dataset.usage;
    renderCopilot();
    announce(`Aangenomen AI-gebruik: ${money(Number(button.dataset.usage))} per gebruiker per maand.`);
  }));

  // Tokenhoeveelheden zijn aparte categorieën. Onbekende schrijftarieven worden niet als gratis behandeld.
  function currentModel() { return data.models[find('#model-route').value].find(model => model.id === find('#model-keuze').value); }

  function selectModels() {
    const route = find('#model-route').value;
    const select = find('#model-keuze');
    select.replaceChildren();
    for (const model of data.models[route]) {
      const option = element('option', '', model.name);
      option.value = model.id;
      select.append(option);
    }
    select.value = route === 'api' ? 'api-sonnet' : 'lurus-sonnet-eu';
    changeModel();
  }

  function changeModel() {
    const model = currentModel();
    const writeInput = find('#tokens-write');
    const freshInput = find('#tokens-fresh');
    if (model.write === null && !writeInput.disabled) {
      // Verplaats bestaande writes naar gewone input, zodat de gekozen hoeveelheid gelijk blijft.
      const writes = writeInput.valueAsNumber;
      const fresh = freshInput.valueAsNumber;
      if (Number.isFinite(writes) && Number.isFinite(fresh)) freshInput.value = String(fresh + writes);
      writeInput.value = '0';
    }
    writeInput.disabled = model.write === null;
    writeInput.setAttribute('aria-describedby', 'model-tariefnoot');
    writeInput.setAttribute('aria-invalid', 'false');
    renderModel();
    renderRateTable();
  }

  function renderModel() {
    const model = currentModel();
    const result = find('#modellen .resultaatkaart');
    try {
      const amounts = {
        fresh: readNumber('tokens-fresh'), write: model.write === null ? 0 : readNumber('tokens-write'),
        read: readNumber('tokens-read'), output: readNumber('tokens-output'),
      };
      const quote = data.quoteTokens(model.id, amounts);
      result.hidden = false;
      showError('model-fout', null);
      find('#model-totaal').textContent = money(quote.total, quote.currency, true);
      find('#model-volume').textContent = `${numberFormat.format(amounts.fresh + amounts.write + amounts.read)} miljoen input + ${numberFormat.format(amounts.output)} miljoen output. ${model.currency === 'EUR' ? 'Lurus na 100% opslag.' : 'Directe API-route.'}`;
      find('#model-input-kosten').textContent = money(quote.inputCost, quote.currency, true);
      find('#model-write-kosten').textContent = model.write === null ? 'Niet berekend' : money(quote.writeCost, quote.currency, true);
      find('#model-read-kosten').textContent = money(quote.readCost, quote.currency, true);
      find('#model-output-kosten').textContent = money(quote.outputCost, quote.currency, true);
      find('#model-tariefnoot').textContent = `${model.note}${model.write === null ? ' Cachewrite-invoer is uitgeschakeld; eventuele nieuwe input staat onder gewone input. Dit voorspelt geen aanvullende cachekosten.' : ''}`;
      sourceLinks(find('#model-bronnen'), model.currency === 'EUR' ? [12] : []);
      if (model.currency === 'USD') {
        const link = element('a', '', 'Officiële modeltarieven ↗');
        link.href = model.id.startsWith('api-o') || model.id === 'api-sonnet' || model.id === 'api-haiku'
          ? 'https://platform.claude.com/docs/en/about-claude/pricing'
          : ['api-argon', 'api-flash', 'api-flash-lite'].includes(model.id)
            ? 'https://aistudio.google.com/docs/pricing'
            : 'https://developers.openai.com/api/docs/pricing.md';
        find('#model-bronnen').append(link);
      }
      all('[data-cache]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    } catch (error) {
      result.hidden = true;
      showError('model-fout', error);
    }
  }

  function renderRateTable() {
    const route = find('#model-route').value;
    const table = find('#model-tarieven');
    table.replaceChildren();
    find('#model-tabel-caption').textContent = `Per miljoen tokens · ${route === 'api' ? 'directe API · USD' : 'Lurus na 100% opslag · EUR'}`;
    for (const model of data.models[route]) {
      const row = element('tr', model.id === currentModel().id ? 'active' : '');
      const title = element('th', '', model.name);
      title.scope = 'row';
      row.append(title);
      for (const rate of [model.input, model.read, model.write, model.output]) row.append(element('td', '', rate === null ? 'Niet vastgesteld' : money(rate, model.currency, true)));
      table.append(row);
    }
  }

  find('#model-form').addEventListener('submit', event => event.preventDefault());
  find('#model-route').addEventListener('change', selectModels);
  find('#model-keuze').addEventListener('change', changeModel);
  all('#model-form input').forEach(input => input.addEventListener('input', renderModel));
  all('[data-cache]').forEach(button => button.addEventListener('click', () => {
    const reads = Number(button.dataset.cache) / 100;
    const supportsWrite = currentModel().write !== null;
    const remaining = ((100 - Number(button.dataset.cache)) / 100).toString();
    find('#tokens-fresh').value = supportsWrite ? '0' : remaining;
    find('#tokens-write').value = supportsWrite ? remaining : '0';
    find('#tokens-read').value = String(reads);
    find('#tokens-output').value = '0.1';
    renderModel();
    button.setAttribute('aria-pressed', 'true');
    announce(`Illustratief scenario: 1 miljoen inputtokens, ${button.dataset.cache}% cachereads en 100.000 outputtokens.`);
  }));

  // De twee studiesets hebben hun eigen schaal; alleen binnen dezelfde set vergelijken.
  function renderBenchmark() {
    const benchmark = data.benchmarks[benchmarkId];
    find('#benchmark-titel').textContent = benchmark.title;
    find('#benchmark-beschrijving').textContent = benchmark.description;
    find('#benchmark-conclusie').textContent = benchmark.conclusion;
    find('#benchmark-noot').textContent = benchmark.note;
    const rows = find('#benchmark-rijen');
    rows.replaceChildren();
    const maximum = Math.max(...benchmark.rows.map(row => row.tokens));
    rows.setAttribute('aria-label', benchmark.rows.map(row => `${row.name}: ${numberFormat.format(row.tokens)} tokens per run, score ${numberFormat.format(row.score)} procent`).join('. '));
    for (const row of benchmark.rows) {
      const group = element('div', 'benchmark-rij');
      const track = element('div', 'balk-spoor');
      const bar = element('span', 'balk-vulling');
      bar.style.width = `${row.tokens / maximum * 100}%`;
      track.setAttribute('aria-hidden', 'true');
      track.append(bar);
      group.append(element('span', 'benchmark-naam', row.name), track,
        element('strong', 'benchmark-waarde', `${numberFormat.format(row.tokens / 1000000)} mln`),
        element('span', 'benchmark-score', `Score ${numberFormat.format(row.score)}%`));
      rows.append(group);
    }
    all('[data-benchmark]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.benchmark === benchmarkId)));
    sourceLinks(find('#benchmark-bronnen'), benchmark.sources);
  }
  all('[data-benchmark]').forEach(button => button.addEventListener('click', () => {
    benchmarkId = button.dataset.benchmark;
    renderBenchmark();
    announce(data.benchmarks[benchmarkId].conclusion);
  }));

  // Native dialogs leveren focusherstel, toetsenbordnavigatie en sluiten met Escape.
  all('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  for (const source of data.sources) {
    const item = element('li');
    const link = element('a', '', `[${source.id}] ${source.title} ↗`);
    link.href = source.url;
    item.append(link);
    if (source.id === 18) {
      for (const [title, url] of [['Anthropic API', 'https://platform.claude.com/docs/en/about-claude/pricing'], ['Google API', 'https://aistudio.google.com/docs/pricing']]) {
        const extra = element('a', '', title + ' ↗'); extra.href = url; item.append(element('br'), extra);
      }
    }
    find('#bronnen-lijst').append(item);
  }
  find('#open-bronnen').addEventListener('click', () => find('#bronnendialoog').showModal());

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    find('#thema').setAttribute('aria-label', theme === 'light' ? 'Donkere weergave inschakelen' : 'Lichte weergave inschakelen');
    try { localStorage.setItem('ai-kosten-thema', theme); } catch { /* Lokale bestanden kunnen opslag blokkeren; de knop blijft werken. */ }
  }
  let savedTheme;
  try { savedTheme = localStorage.getItem('ai-kosten-thema'); } catch { /* Geen opslag nodig voor de rekenhulpen. */ }
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
  find('#thema').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

  renderPlans();
  renderCopilot();
  chooseProduct(selectedProduct.id);
  selectModels();
  renderBenchmark();
  find('.weergaven').hidden = false;
  find('#instap-scenario').hidden = false;
  find('#omp-details').hidden = false;
  find('#thema').hidden = false;
  chooseView(location.hash.slice(1), false);
})();
