/* Openbare lijstprijzen op 4 november 2026. Bronnummering: ../README.md.
 * Tokeninvoer is in miljoenen; gewone input, writes en reads overlappen niet.
 * Geen belastingen, valutaconversie, tools, compute of contractkortingen.
 */
(function () {
  "use strict";

  const plans = [
    {
      id: "codex", name: "Codex", mark: "Cx", route: "ChatGPT Business Standard", monthly: 25, annual: 20, currency: "USD", minSeats: 2,
      included: "Codex-capaciteit met eigen gebruikslimieten; geen vaste API-tokenpot.", extra: "Gedeelde workspacecredits en eventuele externe diensten.", tag: "Vanaf 2 seats", sources: [1, 2, 3, 15, 16],
      details: [
        { title: "Standard is voldoende", text: "Business Standard kost $25 per maand of $20 per maand bij jaarbetaling. Minimaal twee Standard/Premium-seats samen. Premium ($125/$100) koopt meer capaciteit; Enterprise is op offerte. Nieuwe klanten kunnen sinds 24 juni 2026 geen kosteloze Codex-only Business-seats kopen." },
        { title: "Capaciteit is geen tokenbundel", text: "De indicatie van 15–160 lokale berichten per vijf uur voor GPT-6.1 Sol is geen garantie. Weeklimieten, context en gedeeld ChatGPT Work-gebruik tellen mee. Fast/Ultrafast verbruiken 2,5×/8× inbegrepen capaciteit; aangekocht gebruik heeft prijsfactoren 2×/6×. De aangekondigde samenvoeging van limieten in december is nog niet ingevoerd." },
        { title: "Een andere authenticatie is een andere rekening", text: "Lokale Codex kan zonder seatabonnement met een API-key werken; een nieuwe prepaid API-account vraagt minimaal $5 eerste aankoop. Codex Cloud vereist ChatGPT-aanmelding. ChatGPT Plus ($20) is persoonlijk en geen centraal beheerde Business-seat." },
        { title: "API-creditvoordeel niet aftrekken", text: "Een eligible Business-workspace kan na zeven dagen een apart API-voordeel activeren: $20/$100 per Standard/Premium-seat, maximaal $500 per maand. Codex via API-keys is uitgesloten; de native Codex-bundel wordt niet groter. Grant- en vervalregels gelden." },
        { title: "Gebruik in omp vergt toestemming", text: "Technische loginondersteuning bewijst geen licentietoestemming. OpenAI ondersteunt geregistreerde plansharing voor geschikte apps; de directory noemt Pi, niet automatisch omp. Begroot API-gebruik tenzij de specifieke integratie en organisatievoorwaarden zijn bevestigd." }
      ]
    },
    {
      id: "claude", name: "Claude Code", mark: "Cl", route: "Claude Team Standard", monthly: 25, annual: 20, currency: "USD", minSeats: 2,
      included: "Persoonlijke seatcapaciteit, gedeeld met Claude-chat en Cowork.", extra: "Optionele extra usage tegen API-tarieven of een aparte API-rekening.", tag: "Vanaf 2 leden", sources: [4, 5, 6, 15, 17],
      details: [
        { title: "Code zit al in Standard", text: "Team Standard kost $25 per maand of $20 bij jaarbetaling, minimaal twee leden. Premium ($125/$100) is niet vereist. Nieuwe Enterprise-voorwaarden: $20 per seat bij jaarbetaling, minimaal twintig seats, met alle gebruik apart tegen API-tarieven." },
        { title: "Geen gedeelde tokenpot", text: "Chat, Cowork en Code delen capaciteit per persoon, met vijfuur- en weekvensters. Owners kunnen betaalde extra usage inschakelen en begrenzen. Een API-key kan ondanks een bestaand abonnement de afzonderlijke API-rekening aanspreken." },
        { title: "API-only en persoonlijk zijn andere routes", text: "Claude Code kan zonder Team-seat via een Console-organisatie werken. Pro kost persoonlijk $20 per maand of $200 per jaar; Max $100 en Ultra $200 zijn hogere persoonlijke tiers, geen centrale Team-administratie." },
        { title: "Afzonderlijk API-creditvoordeel", text: "Na zeven dagen kan Team $20/$100 per Standard/Premium-seat claimen, maximaal $500 gezamenlijk, gekoppeld aan één Console-organisatie. Messages/Batch en eigen API-apps kunnen in aanmerking komen; interactieve Claude Code en native extra usage niet. Maandelijks verval, geen rollover." },
        { title: "omp gebruikt de zakelijke API-route", text: "Claude-subscription-OAuth is voor native apps, niet vrij herbruikbaar in omp. Hosting van de ongewijzigde Claude Code-binary is een andere situatie. API-creditdekking van gewone omp Messages-calls is een gevolgtrekking uit de algemene voorwaarden, geen expliciete omp-goedkeuring of OAuth-vrijstelling." }
      ]
    },
    {
      id: "copilot", name: "GitHub Copilot", mark: "Gh", route: "GitHub Free + Copilot Business", monthly: 19, annual: null, currency: "USD", minSeats: 1,
      included: "1.900 AI credits ($19) per seat per maand, organisatiegepoold.", extra: "Gemeten meerverbruik, cloudcompute en eventueel Actions.", tag: "Free-organisatie volstaat", sources: [7, 8, 9, 10, 15, 23, 26, 27, 28],
      details: [
        { title: "Laagste reguliere centrale instap", text: "Business kost $19 naast een Free-organisatie; Team/Enterprise Cloud kost extra $4/$21 per platformgebruiker. Copilot Enterprise kost $39 en vereist Enterprise Cloud. Geen openbare nieuwe jaarkorting vastgesteld. Eén seat is hier een rekenaanname, geen bewezen universeel contractminimum." },
        { title: "AI credits, geen premium-requestbundel", text: "Sinds 1 juni 2026 is organisatiegebruik tokengebaseerd: één credit is $0,01. Business/Enterprise bevatten $19/$39 per seat, gepoold en zonder rollover. CLI, chat en agents gebruiken credits; inline completions en next-edit suggestions niet. Meerverbruik staat standaard aan; stel harde budgetstops expliciet in." },
        { title: "Access en Standalone zijn beperkt beschikbaar", text: "Toegelaten sales-managed enterprises kunnen access kiezen: $0 extra Copilot-seat bij een betaalde Enterprise Cloud-licentie, of Standalone $10 zonder die platformlicentie. Beide rekenen alle gemeten AI-gebruik af; inline completions en next-edit suggestions blijven buiten de meter. Geen selfservice voor Free/Team; oude en nieuwe billing kunnen binnen één enterprise niet naast elkaar bestaan." },
        { title: "Beheer is niet hetzelfde als bedrijfsidentiteit", text: "Free + Business biedt centrale seats, modellen, beleid en budgetten, maar geen bedrijfs-SSO/SCIM. Enterprise Cloud + Business kan daarvoor volstaan: Copilot Enterprise is niet verplicht. CLI en VS Code-autocompletion zitten in alle zes combinaties; beleid en clientaanmelding moeten wel ingericht zijn." },
        { title: "Andere routes niet verwarren", text: "Persoonlijke Pro kost $10 en is geen organisatiepool. Lokale BYOK kan in ondersteunde clients, waaronder CLI, zonder Copilot-abonnement; de provider rekent inferentie af. Officiële SDK-OAuth bewijst niet dat omps eigen proxy-/OAuth-route is goedgekeurd. Werkende requests kunnen bestaande credits aanspreken; geen gratis extra pot aannemen." }
      ]
    }
  ];

  // Lurus heeft twee verschillende betaalvormen; geen €0-abonnement suggereren.
  const lurus = {
    id: "lurus", name: "Lurus Code", mark: "Lu", route: "Persoonlijk abonnement óf Team-wallet", sources: [11, 12],
    subscriptions: [
      { name: "Pro", monthly: 20, included: "€30 reguliere credits + €20 afzonderlijke Lura-credits." },
      { name: "Pro+", monthly: 60, included: "€105 reguliere credits + €60 afzonderlijke Lura-credits." },
      { name: "Ultra", monthly: 200, included: "€400 reguliere credits + €200 afzonderlijke Lura-credits." }
    ],
    details: [
      { title: "Team is geen persoonlijk abonnement", text: "Team heeft geen seat- of teambasisvergoeding en geen gepubliceerd seatminimum. Een gefinancierde wallet is nodig. Ledenbudgetten en modelbeleid bieden centraal beheer. Omzetten naar Team is permanent." },
      { title: "De prijstabel is een basistarief", text: "Lurus zet 100% opslag bovenop getoonde modelbasistarieven. De modelcalculator toont daarom tweemaal die bedragen, niet een neutrale EUR-conversie van API-prijzen. Laat feitelijke walletafschrijving bevestigen; cachewrites en andere AI-functies kunnen extra kosten." },
      { title: "Tegoeden hebben verschillende regels", text: "Ongebruikt Team-tegoed en apart gekocht extra tegoed vervallen niet. Inbegrepen individuele abonnementscredits vervallen aan het einde van hun maandperiode. Team publiceert geen afzonderlijke bonusregeling; individuele bonuscredits niet nogmaals als tariefkorting toepassen." },
      { title: "Persoonlijke tiers", text: "Pro kost €20 met €30 reguliere en €20 Lura-credits; Pro+ €60 met €105/€60; Ultra €200 met €400/€200. Beide tegoedsoorten zijn niet uitwisselbaar. Ultra adverteert Agent Teams & Orchestration: niet alle tiers hebben aantoonbaar dezelfde functies." },
      { title: "Eigen agent én compatibiliteits-API", text: "Lurus heeft een eigen CLI/editor-agent en is niet API-only. De compatibiliteits-API vraagt een Lurus-key en tegoed en levert inferentie, niet de hele agentruntime. Begroot een mogelijke omp-koppeling als gatewayverbruik; protocol- en toolcompatibiliteit zijn hier niet getest." }
    ]
  };

  // omp is software: de kosten van modeltoegang horen bij de gekozen providerroute.
  const omp = {
    id: "omp", name: "omp", route: "Harness los van de model- en betaalroute", sources: [13, 14, 15, 17, 18, 19, 21],
    details: [
      { title: "Software is niet de modelrekening", text: "omp heeft geen verplicht abonnement of seatvergoeding. Gebruik eigen zakelijke API-toegang, een gateway of lokale modelserver. GPU, stroom, hosting, zoek-/MCP-diensten, onderhoud en menselijke controle blijven kostenposten." },
      { title: "Technisch kunnen is niet contractueel mogen", text: "Loginroutes voor Codex, Claude en Copilot zijn geen bewijs van licentietoestemming of dezelfde quota. OpenAI-plansharing noemt Pi, niet automatisch omp; Claude-subscription-OAuth is niet vrij herbruikbaar; GitHubs SDK bevestigt niet omps eigen route. Begroot zakelijke API-toegang tenzij specifiek goedgekeurd." },
      { title: "API-credits niet dubbel tellen", text: "Het Claude Team-voordeel kan volgens de algemene API-dekking gewone Messages-calls uit de gekoppelde organisatie dekken [gevolgtrekking]; omp wordt niet expliciet genoemd. Dat is geen OAuth-toestemming. OpenAI sluit Codex via API-keys uit. Trek voordelen nooit als cashkorting van seats af." },
      { title: "Achtergrondwerk telt ook mee", text: "Cachewarming, subagents, advisors, geheugen, compaction en retries kunnen tokens toevoegen. Een lokale costlimiet is geen gegarandeerd organisatiebreed factuurplafond: lopende requests kunnen doorgaan en achtergrondgeheugen valt niet volledig onder de sessielimiet." },
      { title: "Geen universele besparingsfactor", text: "De gematchte Strands-set vond minder omp-tokens dan Claude Code, maar meer dan Codex. De claim van 61% minder tokens betreft uitsluitend Grok 4 Fast-output in een edit-experiment. Geen van beide bewijst een vaste maandbesparing voor alle modellen of abonnementen." }
    ]
  };

  // Dezelfde vragen per product: betaalroute, prijs en centraal beheer.
  const planGuides = {
    codex: {
      currency: "USD",
      management: "Business werkt met een centrale workspace en toewijsbare seats. De inbegrepen Codex-capaciteit is geen API-tokenpot; de API-route heeft een afzonderlijke rekening.",
      rows: [
        { name: plans[0].route, monthly: plans[0].monthly, annual: plans[0].annual, note: "Centraal beheerde workspace; minimaal twee betaalde Standard/Premium-seats samen." },
        { name: "Business Premium", monthly: 125, annual: 100, note: "Dezelfde workspace, hogere capaciteit. Niet vereist om Codex te gebruiken." },
        { name: "Enterprise", monthly: "Offerte", annual: "Offerte", note: "Centrale organisatie-inrichting; prijs, seats en gebruik volgens contract." },
        { name: "API zonder seatabonnement", monthly: "API-verbruik", annual: "n.v.t.", note: "Zakelijke API-account; lokale Codex, geen Codex Cloud. Nieuwe prepaid account: minimaal $5 eerste aankoop." },
        { name: "Persoonlijk: ChatGPT Plus", monthly: 20, annual: null, note: "Geen centrale Business-seat of gedeelde organisatieadministratie." }
      ]
    },
    claude: {
      currency: "USD",
      management: "Team beheert leden en betaalde extra usage centraal. De inbegrepen capaciteit blijft per persoon, gedeeld met chat en Cowork; het is geen gedeelde tokenpot.",
      rows: [
        { name: plans[1].route, monthly: plans[1].monthly, annual: plans[1].annual, note: "Centraal Team-beheer; minimaal twee leden. Claude Code is inbegrepen." },
        { name: "Team Premium", monthly: 125, annual: 100, note: "Dezelfde Team-administratie, hogere limieten. Niet vereist voor Claude Code." },
        { name: "Enterprise", monthly: "Op jaarcontract", annual: 20, note: "Nieuwe standaardvoorwaarden: minimaal twintig seats; alle gebruik apart tegen API-tarieven." },
        { name: "API zonder seatabonnement", monthly: "API-verbruik", annual: "n.v.t.", note: "Claude Console-organisatie; modelgebruik apart afrekenen zonder Team-abonnement." },
        { name: "Persoonlijk: Claude Pro", monthly: 20, annual: 200 / 12, note: "Geen centrale Team-administratie. Bij jaarbetaling $200 vooraf; Max en Ultra staan bij de voorwaarden." }
      ]
    },
    lurus: {
      currency: "EUR",
      management: "Voor centraal beheer kies je Team: een gedeelde wallet, ledenbudgetten en modelbeleid. Losse Pro-, Pro+- en Ultra-abonnementen zijn persoonlijk, geen Team-seats.",
      rows: [
        ...lurus.subscriptions.map(subscription => ({
          name: subscription.name + " · persoonlijk", monthly: subscription.monthly, annual: null,
          note: subscription.included + " Geen centraal Team-beheer."
        })),
        { name: "Team", monthly: "Wallet op verbruik", annual: "n.v.t.", note: "Geen seat- of basisvergoeding en geen Pro-abonnement per lid nodig. Alle gebruik betaald, met 100% opslag op modelbasistarieven. Omzetten naar Team is permanent." }
      ]
    }
  };

  // Alle tarieven per miljoen tokens; null betekent onbekend of niet aangeboden.
  const openaiNote = "Directe Standard-API, niet de ingelogde Codex- of Copilot-rate-card. Bij modellen met een >272k-tier: input/cache 2×, output 1,5×. Langere cachebewaring kost meer.";
  const anthropicNote = "Directe normale API; korte cachewrite bewaart vijf minuten. Eén uur kost 2× gewone input; Fast Opus kost 2× standaard. Geen omrekening van native seatquota of Copilotprijzen.";
  const models = {
    api: [
      { id: "api-sol", name: "OpenAI GPT-6.1 Sol", input: 2, read: 0.1, write: 2.5, output: 10, currency: "USD", note: "Cachewrite: 30 minuten. " + openaiNote, sources: [18, 3, 10] },
      { id: "api-terra", name: "OpenAI GPT-6.1 Terra", input: 1, read: 0.05, write: 1.25, output: 5, currency: "USD", note: "Cachewrite: 30 minuten. " + openaiNote, sources: [18, 3, 10] },
      { id: "api-luna", name: "OpenAI GPT-6 Luna", input: 0.1, read: 0.01, write: 0.125, output: 0.5, currency: "USD", note: "Cachewrite: 30 minuten. " + openaiNote, sources: [18, 3, 10] },
      { id: "api-codex", name: "OpenAI GPT-5.3 Codex", input: 1.75, read: 0.175, write: null, output: 14, currency: "USD", note: "Geen apart cachewrite-tarief vermeld; daarom niet berekend. " + openaiNote, sources: [18, 3, 10] },
      { id: "api-opus", name: "Anthropic Claude Opus 5.5", input: 4, read: 0.2, write: 5, output: 20, currency: "USD", note: anthropicNote, sources: [18, 10] },
      { id: "api-sonnet", name: "Anthropic Claude Sonnet 5.5", input: 2, read: 0.1, write: 2.5, output: 10, currency: "USD", note: anthropicNote, sources: [18, 10] },
      { id: "api-haiku", name: "Anthropic Claude Haiku 5.5 (≤100k)", input: 0.1, read: 0.01, write: 0.125, output: 0.5, currency: "USD", note: "Alleen prompts ≤100k. Daarboven krijgt de hele request de hogere tier: $0,50 input/$2,50 output, ook hogere cachecategorieën. " + anthropicNote, sources: [18] },
      { id: "api-argon", name: "Google Gemini 4 Argon", input: 2, read: 0.1, write: null, output: 10, currency: "USD", note: "Directe normale API; alleen impliciete caching. Getoond introductietarief verdubbelt op 1 december 2026. Geen los write-tarief; niet de Copilot-billingroute.", sources: [18, 10] },
      { id: "api-flash", name: "Google Gemini 3.8 Flash", input: 0.75, read: 0.075, write: null, output: 3.75, currency: "USD", note: "Directe normale API; introductietarief verdubbelt op 1 januari 2027. Expliciete cacheopslag $0,50 per miljoen token-uren is niet meegerekend; geen apart write-tarief vastgesteld. Niet de Copilot-rate-card.", sources: [18, 10] },
      { id: "api-flash-lite", name: "Google Gemini 3.1 Flash-Lite (tekst)", input: 0.25, read: 0.025, write: null, output: 1.5, currency: "USD", note: "Directe normale tekst-API. Expliciete cacheopslag $1 per miljoen token-uren niet meegerekend; geen apart write-tarief vastgesteld. Gratis tiers kunnen andere datavoorwaarden hebben. Niet de Copilot-route.", sources: [18, 10] }
    ],
    lurus: [
      { id: "lurus-lura", name: "Lura", input: 2.6, read: 0.7, write: null, output: 7.2 },
      { id: "lurus-sonnet-eu", name: "Claude Sonnet 5.5 · EU", input: 4.4, read: 0.44, write: null, output: 22 },
      { id: "lurus-opus-eu", name: "Claude Opus 5.5 · EU", input: 8.8, read: 0.44, write: null, output: 44 },
      { id: "lurus-sol-eu", name: "GPT-6.1 Sol · EU", input: 4.8, read: 0.24, write: null, output: 24 },
      { id: "lurus-sol-global", name: "GPT-6.1 Sol · Global/VS", input: 4, read: 0.2, write: null, output: 20 },
      { id: "lurus-luna-eu", name: "GPT-6 Luna · EU", input: 0.24, read: 0.024, write: null, output: 1.2 }
    ].map(function (model) {
      return Object.assign(model, { currency: "EUR", note: "Lurus-walletroute: berekend als 2× het gepubliceerde providerbasistarief (100% opslag), zonder individuele bonuskorting. Cachewrites/opslag en andere AI-functies niet vastgesteld of inbegrepen; werkelijke walletafschrijving bevestigen. Geen directe API- of Copilot-rate-card.", sources: [12] });
    })
  };

  const copilotFeatures = [
    { id: "repositories", name: "Private repositories", description: "Code op GitHub opslaan en delen." },
    { id: "privateRules", name: "Reviews & branchregels", description: "Verplichte reviews en CODEOWNERS, ook in private repos." },
    { id: "sso", name: "Bedrijfs-SSO / SCIM", description: "Bedrijfsaanmelding en gebruikersprovisioning." },
    { id: "multiOrg", name: "Meerdere organisaties", description: "GitHub-beleid en facturatie centraal over organisaties." },
    { id: "priority", name: "Modelprioriteit", description: "Prioriteit voor premiummodellen; geen onbeperkt gebruik." }
  ];
  // null is niet bevestigd, en telt daarom niet als een bevestigde functiematch.
  const copilot = [
    {
      id: "free-business", name: "Free + Copilot Business", platformRate: 0, seatRate: 19, creditPerSeat: 19, eligibleOnly: false,
      features: { repositories: true, privateRules: false, sso: false, multiOrg: false, priority: false },
      identity: "Persoonlijke GitHub-accounts; verplichte 2FA mogelijk, geen bedrijfs-SSO/SCIM.",
      management: "Organisatie-eigenaren beheren seats, modellen, beleid en organisatiebudget.",
      note: "Laagste reguliere centrale selfservice-instap; CLI en VS Code-autocompletion inbegrepen.", sources: [7, 8, 10, 24, 26, 27, 28]
    },
    {
      id: "team-business", name: "Team + Copilot Business", platformRate: 4, seatRate: 19, creditPerSeat: 19, eligibleOnly: false,
      features: { repositories: true, privateRules: true, sso: false, multiOrg: false, priority: false },
      identity: "Persoonlijke accounts, geen bedrijfs-SSO/SCIM.",
      management: "Copilot-organisatiebeheer zoals Free; Team voegt repositoryregels toe.",
      note: "Team koopt vooral extra private-repositoryfuncties, niet extra Copilotcapaciteit. Geen bevestigde jaarkorting.", sources: [7, 8, 24, 25, 26, 27]
    },
    {
      id: "enterprise-business", name: "Enterprise Cloud + Business", platformRate: 21, seatRate: 19, creditPerSeat: 19, eligibleOnly: false,
      features: { repositories: true, privateRules: true, sso: true, multiOrg: true, priority: false },
      identity: "SAML-SSO/SCIM en optioneel Enterprise Managed Users, na inrichting.",
      management: "Centraal enterprisebeleid en seats; gebruikers-, costcenter- en enterprisebudgetten.",
      note: "Geldige combinatie: bedrijfsidentiteit vereist niet Copilot Enterprise.", sources: [7, 8, 24, 26, 27, 28]
    },
    {
      id: "enterprise-enterprise", name: "Enterprise Cloud + Copilot Enterprise", platformRate: 21, seatRate: 39, creditPerSeat: 39, eligibleOnly: false,
      features: { repositories: true, privateRules: true, sso: true, multiOrg: true, priority: true },
      identity: "Dezelfde Enterprise Cloud-identiteitsopties; geen exclusief Copilot Enterprise-voordeel.",
      management: "Enterprisebeleid en budgetten; organisatie-eigenaren verdelen ingeschakelde seats.",
      note: "Meer inbegrepen credits en prioriteit voor premiummodellen; Business bevat ook agents, CLI en beheer.", sources: [7, 8, 26, 27, 28]
    },
    {
      id: "enterprise-access", name: "Enterprise Cloud + Copilot access", platformRate: 21, seatRate: 0, creditPerSeat: 0, eligibleOnly: true,
      features: { repositories: true, privateRules: true, sso: true, multiOrg: true, priority: true },
      identity: "Ingestelde identiteitsroute van het toegelaten enterpriseaccount.",
      management: "Enterprise-eigenaren wijzen seats toe en beheren centrale gebruiksbudgetten.",
      note: "Beperkte sales-managed rollout. Betaalde platformlicentie nodig; gemeten AI-gebruik vanaf het eerste verzoek. Niet naast oude billing binnen dezelfde enterprise.", sources: [9, 10, 24, 26, 27, 28]
    },
    {
      id: "standalone", name: "Copilot Standalone", platformRate: 0, seatRate: 10, creditPerSeat: 0, eligibleOnly: true,
      features: { repositories: false, privateRules: false, sso: null, multiOrg: false, priority: true },
      identity: "Identiteit en toegang binnen een toegelaten enterpriseaccount; SAML/SCIM niet bevestigd in de bekeken Standalone-bron.",
      management: "Centrale enterprisetoewijzing, beleid en gebruiksbudgetten; geen betaald GitHub-repositoryplatform.",
      note: "Geen betaalde Enterprise Cloud-gebruikerslicentie vereist of repositoryrechten inbegrepen. Geen Free/Team-selfservice; gemeten AI-gebruik apart. Contractminimums bevestigen.", sources: [9, 10, 26, 27, 28]
    }
  ];

  const benchmarkNote = "Leveranciersstudie van Strands, gepubliceerd 13 oktober 2026; snapshot 17 september. Circa 94.000 runs in de volledige studie, niet in deze matched set. Deels geschatte kosten; scores sluiten fouten uit, kosten omvatten alle trials. Geen actuele seatbenchmark, geen tokens-per-seconde-meting. Vergelijk de twee modelgroepen niet onderling.";
  const benchmarks = {
    anthropic: { title: "Gematchte Anthropic-set", description: "Claude Fable 5, Opus 5/4.8 en Sonnet 5; 8.240 runs per harness, hoge reasoning.", rows: [{ name: "Claude Code", tokens: 1645000, cost: 1.574, score: 79.28 }, { name: "omp", tokens: 1319000, cost: 1.074, score: 78.22 }], conclusion: "In deze set gebruikte Claude Code ongeveer 1,25× zoveel tokens als omp, met een iets hogere score.", note: benchmarkNote, sources: [19] },
    openai: { title: "Gematchte OpenAI-set", description: "GPT-5.6 Luna/Sol/Terra; 6.180 runs per harness, hoge reasoning.", rows: [{ name: "Codex", tokens: 789000, cost: 0.362, score: 69.72 }, { name: "omp", tokens: 1199000, cost: 0.492, score: 69.73 }], conclusion: "In deze set gebruikte Codex ongeveer 0,66× zoveel tokens als omp, bij vrijwel gelijke score. omp is dus niet aantoonbaar altijd zuiniger.", note: benchmarkNote, sources: [19] }
  };

  const sources = [
    { id: 1, title: "OpenAI Business: prijzen en minimum", url: "https://help.openai.com/en/articles/8792828-chatgpt-business-overview" },
    { id: 2, title: "Codex-only en legacy-aanbod", url: "https://openai.com/index/codex-flexible-pricing-for-teams/" },
    { id: 3, title: "Codex: prijsgids en gebruik", url: "https://learn.chatgpt.com/docs/pricing" },
    { id: 4, title: "Claude: plannen en prijzen", url: "https://claude.com/pricing" },
    { id: 5, title: "Claude Enterprise: seat- en usagebilling", url: "https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan" },
    { id: 6, title: "Claude Code: kosten", url: "https://code.claude.com/docs/en/costs" },
    { id: 7, title: "Copilot: seats en billingcycli", url: "https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles" },
    { id: 8, title: "GitHub: platformprijzen", url: "https://github.com/pricing" },
    { id: 9, title: "Copilot access: rollout en voorwaarden", url: "https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot" },
    { id: 10, title: "Copilot: organisatieverbruik en pooling", url: "https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing" },
    { id: 11, title: "Lurus: abonnementen en Team", url: "https://code.lurus.ai/en/pricing/" },
    { id: 12, title: "Lurus: modelkosten en opslag", url: "https://code.lurus.ai/en/docs/models-costs/" },
    { id: 13, title: "omp: MIT-licentie", url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/LICENSE" },
    { id: 14, title: "omp: werking en providers", url: "https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md" },
    { id: 15, title: "Derdepartijauthenticatie: OpenAI-plansharing", url: "https://developers.openai.com/siwc/token-sharing-open-source.md" },
    { id: 16, title: "OpenAI: API-creditvoordeel en uitsluitingen", url: "https://help.openai.com/en/articles/20001626-api-credits-benefit-for-eligible-chatgpt-subscriptions" },
    { id: 17, title: "Anthropic: API-creditvoordeel", url: "https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans" },
    { id: 18, title: "Directe API-prijzen: OpenAI", url: "https://developers.openai.com/api/docs/pricing.md" },
    { id: 19, title: "Strands: harnessstudie en methodologie", url: "https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/" },
    { id: 20, title: "Composio: Kimi K3-harnessstudie", url: "https://composio.dev/content/best-ai-agent-harnesses" },
    { id: 21, title: "omp-maker: het edit-experiment", url: "https://blog.can.ac/2026/02/12/the-harness-problem/" },
    { id: 22, title: "GitHub: sandbox- en infrastructuurbilling", url: "https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes" },
    { id: 23, title: "Copilot: eigen modelkeys", url: "https://docs.github.com/en/copilot/concepts/models/bring-your-own-key" },
    { id: 24, title: "GitHub: plannen en functies", url: "https://docs.github.com/en/get-started/learning-about-github/githubs-plans" },
    { id: 25, title: "GitHub: billingcyclus wijzigen", url: "https://docs.github.com/en/billing/how-tos/manage-plan-and-licenses/change-billing-cycle" },
    { id: 26, title: "Copilot: functies per plan", url: "https://docs.github.com/en/copilot/get-started/plans" },
    { id: 27, title: "Copilot: centraal seats toewijzen", url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access" },
    { id: 28, title: "GitHub: Enterprise Managed Users", url: "https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users" }
  ];

  function requireCount(value, name) {
    if (!Number.isInteger(value) || value < 1 || value > 10000) {
      throw new RangeError(name + " moet een geheel getal van 1 tot en met 10.000 zijn.");
    }
  }

  function requireAmount(value, name) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(name + " moet een eindig, niet-negatief getal zijn.");
    }
  }

  function quotePlan(id, seats, annual) {
    const plan = plans.find(function (item) { return item.id === id; });
    if (!plan) throw new RangeError("Onbekend plan.");
    requireCount(seats, "Het aantal seats");
    const annualAvailable = plan.annual !== null;
    const yearly = Boolean(annual) && annualAvailable;
    const billedSeats = Math.max(plan.minSeats, seats);
    const rate = yearly ? plan.annual : plan.monthly;
    const fixed = rate * billedSeats;
    return { seats: seats, billedSeats: billedSeats, rate: rate, fixed: fixed, currency: plan.currency, yearlyCommitment: yearly ? fixed * 12 : null, annualAvailable: annualAvailable };
  }

  function quoteCopilot(id, users, usagePerUser) {
    const option = copilot.find(function (item) { return item.id === id; });
    if (!option) throw new RangeError("Onbekende Copilot-combinatie.");
    requireCount(users, "Het aantal gebruikers");
    requireAmount(usagePerUser, "Het gebruik per gebruiker");
    // Elke gebruiker krijgt Copilot én het platform van de gekozen combinatie.
    const platform = option.platformRate * users;
    const licenses = option.seatRate * users;
    const usage = usagePerUser * users;
    const included = option.creditPerSeat * users;
    const overage = Math.max(0, usage - included);
    return { platform: platform, licenses: licenses, usage: usage, included: included, overage: overage, total: platform + licenses + overage, currency: "USD" };
  }

  function quoteTokens(modelId, amounts) {
    const model = models.api.find(function (item) { return item.id === modelId; }) || models.lurus.find(function (item) { return item.id === modelId; });
    if (!model) throw new RangeError("Onbekend model.");
    if (!amounts || typeof amounts !== "object") throw new TypeError("Geef tokenhoeveelheden in miljoenen op.");
    ["fresh", "write", "read", "output"].forEach(function (key) { requireAmount(amounts[key], "Tokenhoeveelheid " + key); });
    if (amounts.write > 0 && model.write === null) {
      throw new RangeError("Voor dit model is geen afzonderlijk cachewrite-tarief bekend; deze kosten kunnen niet worden berekend.");
    }
    const inputCost = amounts.fresh * model.input;
    const writeCost = amounts.write === 0 ? 0 : amounts.write * model.write;
    const readCost = amounts.read * model.read;
    const outputCost = amounts.output * model.output;
    return { inputCost: inputCost, writeCost: writeCost, readCost: readCost, outputCost: outputCost, total: inputCost + writeCost + readCost + outputCost, currency: model.currency };
  }

  window.KOSTEN = { plans: plans, lurus: lurus, omp: omp, planGuides: planGuides, models: models, copilot: copilot, copilotFeatures: copilotFeatures, benchmarks: benchmarks, sources: sources, quotePlan: quotePlan, quoteCopilot: quoteCopilot, quoteTokens: quoteTokens };
})();
