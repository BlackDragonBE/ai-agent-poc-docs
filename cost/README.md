# Kosten van coding-agents voor een organisatie

**Peildatum: 4 november 2026.** Onderzocht: Codex, Claude Code, GitHub Copilot, Lurus Code en omp. Dit zijn de Nederlandstalige bevindingen; de [onderzoeksnotities](#onderzoeksnotities-in-het-engels) blijven in het Engels.

**Interactief verkennen:** [open de kostenverkenner](index.html) voor instapprijzen, plannen en beheer per product, modelkosten en benchmarkgrafieken. Onder **Plannen & beheer** kies je Codex, Claude Code, GitHub Copilot of Lurus Code; de uitgebreide Copilot-combinaties staan binnen die productkeuze, niet als apart hoofdonderwerp. Je kunt `index.html` rechtstreeks in een browser openen; er is geen installatie of server nodig. De rekenhulpen draaien lokaal met JavaScript. Dit document blijft de volledige onderbouwing; de interactieve cijfers worden apart bijgehouden in `js/gegevens.js`.

Bedragen zijn openbare lijstprijzen, geen organisatiespecifieke offerte. USD en EUR blijven gescheiden: geen fictieve wisselkoers of veronderstelde lokale btw-behandeling. Controleer lokale checkout, belastingen, contractkortingen en eventuele valutakosten. Jaarprijzen hieronder zijn maandgemiddelden bij jaarbetaling, niet maandelijks opzegbare tarieven.

## 1. Het korte antwoord

- **Lurus heeft wel abonnementen:** Pro **€20**, Pro+ **€60** en Ultra **€200 per persoon per maand**. Voor centraal teambeheer is er een **apart Team-aanbod op verbruik**, zonder seatvergoeding maar ook zonder inbegrepen maandcredits. Lurus heeft een eigen CLI/editor-agent en is dus niet API-only. [11–12]
- **omp is een harness, geen modelabonnement of modelaanbieder.** Er is geen verplichte omp-seatlicentie; je betaalt de gekozen model- en toegangsroute en eventueel eigen infrastructuur/beheer. Daarom staat omp niet tussen de abonnementsprijzen als een “gratis provider”. [13–15]
- **GitHub Enterprise is niet nodig voor Copilot Business.** Een GitHub Free-organisatie volstaat. Het nieuwe enterprise-aanbod heeft andere voorwaarden en geen inbegrepen AI-verbruik. [7–9]
- **Een abonnement is geen onbeperkte tokenbundel.** Vergelijk vaste toegangskosten, inbegrepen capaciteit en werkelijk meerverbruik afzonderlijk. Ook caching, modelkeuze en achtergrondwerk beïnvloeden de rekening.
- **omp is niet aantoonbaar altijd zuiniger.** Een gepubliceerde vergelijking vond minder tokens bij omp dan bij Claude Code, maar juist meer dan bij Codex. Dat zijn specifieke benchmarkresultaten, geen universele verhoudingen. Voor Copilot en Lurus ontbreekt in dit onderzoek een vergelijkbare directe meting tegenover omp. [19–21]

## 2. Goedkoopste instap voor centraal beheerde gebruikers

Hier betekent een *seat* een toegewezen gebruikersplaats. Een persoonlijk abonnement is geen vervanging voor centrale organisatieadministratie. Dit overzicht gaat over nieuwe aankopen, tenzij uitdrukkelijk anders vermeld.

**Lurus kent twee afzonderlijke betaalvormen:** de individuele abonnementen staan bij de persoonlijke instap en in §3; **Team** staat hieronder omdat die route een gedeelde wallet, ledenbudgetten en centraal modelbeleid biedt. Een Team-lid hoeft niet daarnaast een Pro-abonnement te kopen. De interactieve Lurus-kaart gebruikt dezelfde opbouw als de andere kaarten en toont Pro als **persoonlijke** instap, met Pro+ en Ultra als alternatieven. Alle betaalroutes, inclusief Team, staan bij **Plannen & beheer**. Er wordt geen fictief teamtotaal voor persoonlijke abonnementen of nog onbekend walletverbruik berekend. [11–12]

| Harness / aanschafroute | Vast per gebruiker per maand, maandbetaling | Bij jaarbetaling, per gebruiker per maand | Minimale afname / noodzakelijke basis | Wat komt bovenop de vaste prijs? |
| --- | ---: | ---: | --- | --- |
| **Codex via ChatGPT Business Standard** | **$25** | **$20**; $240 per jaar | Minimaal **2** betaalde Standard/Premium-seats samen | Gedeeld aangekocht Codex-/workspace-tegoed voor gebruik boven de inbegrepen limieten; externe diensten indien gebruikt. [1–3] |
| **Claude Code via Claude Team Standard** | **$25** | **$20**; $240 per jaar | Minimaal **2** leden; Standard bevat Code al | Optioneel betaald meerverbruik na de persoonlijke seatlimiet; afzonderlijke API-rekening indien die route wordt gebruikt. [4–6] |
| **Copilot Business, reguliere selfservice** | **$19** | Geen gepubliceerde nieuwe jaarkorting vastgesteld | **GitHub Free-organisatie volstaat**; openbare documenten noemen geen universeel minimumaantal seats | Inclusief **1.900 AI credits = $19 verbruikswaarde** per seat, samen gepoold. Daarboven betaald gebruik; eventueel cloudcompute/Actions. [7–8, 10] |
| **Copilot Standalone, nieuwe sales-managed route** | **$10** | Geen algemeen jaartarief vastgesteld | Alleen via het gefaseerde enterprise-aanbod met GitHub-/Microsoft-accountteam; nog niet voor Free/Team-organisaties of selfservice | **Geen inbegrepen AI credits**: al het gemeten gebruik vanaf het eerste verzoek betalen. Eventuele contractminimums laten bevestigen. [9] |
| **Copilot access met bestaande GitHub Enterprise Cloud-licentie** | **$0 extra Copilot-seat** | Afhankelijk van Enterprise-contract | Zelfde beperkte rollout; een **betaalde Enterprise Cloud-gebruikerslicentie** blijft nodig voor deze variant | Alle gemeten AI-gebruik vanaf het eerste verzoek; onderliggende GitHub-licentie en compute zijn niet gratis. [9] |
| **Lurus Team** | **€0 seat- en teambasisvergoeding** | Niet van toepassing: wallet op verbruik | Teamaccount en gefinancierde gedeelde wallet; geen gepubliceerd seatminimum vastgesteld | Model- en AI-functieverbruik. Let op de **100% opslag op de getoonde modelbasistarieven**. [11–12] |

**Minimumfactuur voor de twee Standard-seatabonnementen:** zowel ChatGPT Business als Claude Team kost bij twee plaatsen $50 per maand, of $480 vooraf per jaar. Er hoeft voor de eigen harness geen persoonlijk Plus/Pro-abonnement bovenop. Een Premium-seat is bij geen van beide nodig om de coding-agent te mogen gebruiken. [1, 4]

**API zonder seatabonnement kan ook bij de eigen agents.** Codex lokaal kan met een OpenAI API-key; Claude Code kan via een Claude Console-organisatie. Daarmee betaal je verbruik zonder eerst Business/Team-seats te kopen. Dat is niet hetzelfde governance- en cloudproduct: Codex Cloud vereist ChatGPT-aanmelding. OpenAI noemt voor een nieuwe prepaid API-account een eerste aankoop van minimaal $5; dat is geen maandelijkse seatprijs. [3, 6]

### Duurdere tiers en verplichte onderliggende producten

| Optie | Openbare vaste prijs | Betekenis voor de kosten |
| --- | --- | --- |
| ChatGPT Business Premium | $125 per maand of $100 per maand bij jaarbetaling | Meer capaciteit; niet vereist voor Codex. Enterprise heeft offerte-/contractprijzen. [1] |
| Claude Team Premium | $125 per maand of $100 per maand bij jaarbetaling | Hogere limieten; niet vereist voor Code. [4] |
| Claude Enterprise, nieuwe standaardvoorwaarden | $20 per seat per maand bij jaarbetaling, minimaal 20 seats | Minimaal $4.800 per jaar **alleen toegang**; alle gebruik apart tegen API-tarieven. Bestaande contracten kunnen verschillen. [5] |
| Copilot Enterprise, bestaande billingroute | $39 per seat per maand, inclusief 3.900 gepoolde credits per seat | Vereist GitHub Enterprise Cloud. Onderliggende GitHub-licentie apart meetellen. [7] |
| GitHub-basisplannen | Free $0; Team $4; Enterprise $21 per gebruiker per maand op de openbare prijspagina | Team/Enterprise alleen kopen als hun eigen functies nodig zijn; niet verplicht bij Copilot Business. De Enterprise-prijspagina is geen garantie op onmiddellijke toelating tot de nieuwe Copilot-access-rollout. [8–9] |
| Codex-only Business-seats zonder vaste vergoeding | Alleen bestaand, daarvoor in aanmerking komend aanbod | Sinds **24 juni 2026 niet meer beschikbaar voor nieuwe Business-klanten**. Enterprise Codex-only kan contractueel bestaan; geen algemeen gratis nieuwe-teamroute. [2] |

De nieuwe Copilot-access-billing geldt op enterpriseniveau. Je kunt binnen dezelfde enterprise niet tegelijk access-seats en de oude Business/Enterprise-billing houden. Overstappen is vrijwillig, niet automatisch. [9]

### Persoonlijke instap: goedkoper is niet hetzelfde als een organisatie-seat

| Product | Goedkoopste relevante persoonlijke betaalde abonnement | Belangrijke grens |
| --- | --- | --- |
| Codex | ChatGPT Plus **$20 per maand** voor de brede CLI/IDE/cloud-route | Free en Go hebben beperkter Luna-desktopaanbod, afhankelijk van rollout; geen equivalent centraal beheerde Business-seat. [3] |
| Claude Code | Pro **$20 per maand**, of **$200 per jaar**: $16,67 per maand gemiddeld | Geen centrale Team-administratie. Max $100 en Ultra $200 zijn hogere persoonlijke tiers. [4] |
| Copilot | Pro **$10 per maand** | Individueel, niet organisatiegepoold. Persoonlijke Free is geen organisatieplan. [7, 10] |
| Lurus | Pro **€20 per maand** | Inclusief €30 reguliere credits plus afzonderlijk €20 Lura-credits; niet hetzelfde aanbod als Team. [11] |

### omp: de harness staat los van de modelrekening

Codex en Claude Code zijn harnesses; OpenAI en Anthropic zijn hun modelaanbieders. Copilot bundelt modeltoegang binnen zijn eigen betaalroute. Lurus combineert een eigen harness met modelroutes en het aangepaste Lura-model. **De tool, het model en de betaalroute zijn verschillende keuzes.**

omp is een provideronafhankelijke harness met MIT-licentie, geen eigen inference- of abonnementsbundel. Combineer die software met zakelijke API-toegang, een gateway, een lokaal model of een specifiek toegestane abonnementsroute. “Geen omp-abonnement” zegt niets over de kosten van die modeltoegang. Dat is een andere vergelijking dan een Business- of Team-seatprijs. [13–15]

Technische loginondersteuning voor Codex/ChatGPT, Claude of Copilot bewijst niet dat ieder abonnement in omp mag worden hergebruikt, of dat dezelfde quota gelden. De concrete beperkingen staan in [§6](#6-kan-omp-de-abonnementen-van-de-anderen-gebruiken).

## 3. Welke capaciteit koop je werkelijk?

### Codex

Business Standard heeft inbegrepen Codex-gebruik; daarna kun je gedeelde workspacecredits inzetten. De inbegrepen capaciteit is **geen vaste hoeveelheid API-tokens of gegarandeerd bedrag aan API-verbruik**. Model, taakomvang, context en lokale/cloud-uitvoering tellen mee. De huidige prijsgids noemt voor Standard/Plus met GPT-6.1 Sol ongeveer **15–160 lokale berichten per vijf uur**, als indicatie, niet als gegarandeerd quotum. Ook weeklimieten en gedeeld gebruik met ChatGPT Work kunnen gelden. [1–3]

Snellere standen kunnen de capaciteit veel sneller opmaken: Fast verbruikt volgens de gids **2,5×** en Ultrafast **8×** van de inbegrepen capaciteit. Voor aangekocht gebruik gelden andere prijsfactoren: **2×** en **6×**. Dat zijn verbruiks-/prijsfactoren, geen gegarandeerde snelheidswinst. Een brede samenvoeging van ChatGPT- en Codex-limieten is aangekondigd voor **december 2026** en wordt hier niet als al ingevoerd behandeld. [3]

### Claude Code

Team Standard en Premium hebben limieten **per persoon**, niet één gedeelde tokenpot. Claude-chat, Cowork en Code delen die seatcapaciteit, met vijfuur- en weekvensters. Owners kunnen aanvullend betaalde usage credits activeren en begrenzen; na de inbegrepen capaciteit wordt dat verbruik tegen API-tarieven afgerekend. Een API-key in de configuratie kan juist de afzonderlijke API-rekening aanspreken terwijl de gebruiker ook een abonnement heeft: controleer de actieve authenticatieroute. [4, 6]

De leveranciers publiceren onderstaande planningsindicaties. Dit zijn **afzonderlijke leveranciersindicaties**, geen onderling gecontroleerde meting, gegarandeerde factuur of extra vaste toeslag bovenop iedere seat. Gebruik ze niet als bewijs dat één harness een bepaald percentage goedkoper is.

| Leverancier | Gepubliceerde maandindicatie per developer | Context |
| --- | --- | --- |
| Anthropic | $150–250 | Enterprisegebruik; circa $13 per actieve dag. [6] |
| OpenAI | $100–200 | Codex-planningsindicatie. [3] |

### Copilot

Organisatiegebruik is sinds **1 juni 2026 tokengebaseerd**, omgerekend naar AI credits; **1 credit = $0,01**. De oude 300/1.000-premium-requestvergelijking en bijbehorende modelmultipliers zijn niet de huidige Business-billing. Chat/agent, CLI en cloudagent kunnen dezelfde gepoolde credits aanspreken. Inline completions en next-edit suggestions verbruiken op betaalde plannen geen AI credits. [7, 10]

Bij Business/Enterprise staat betaald meerverbruik volgens de documentatie standaard aan. Wie een voorspelbaar plafond wil, moet die policy en de budgetten expliciet instellen. Inbegrepen credits worden maandelijks vernieuwd en rollen niet door. Een lager vast seattarief is niet automatisch een lagere totaalrekening:

| Rekenvoorbeeld: 10 gebruikers, dezelfde modeltarieven en geen compute of kortingen | Business: $190 vast, $190 gebruik inbegrepen | Standalone: $100 vast, niets inbegrepen |
| --- | ---: | ---: |
| Gezamenlijk gemeten AI-gebruik $50 per maand | $190 totaal | $150 totaal |
| Gezamenlijk gemeten AI-gebruik $190 per maand | $190 totaal | $290 totaal |

Dit is rekenwerk, geen gemeten workload. Bij deze aannames ligt het omslagpunt op **$90 gezamenlijk maandgebruik**. Standalone vereist bovendien de genoemde sales-managed toelating; een Free-organisatie kan niet simpelweg deze lagere seatprijs kiezen. Voor bestaande Enterprise Cloud-gebruikers moet je de **extra** Copilotkosten en de al bestaande GitHub-kosten uit elkaar houden. [9–10]

**Twee verschillende producten met “Enterprise” in de naam**

- **GitHub Free, Team en Enterprise Cloud** zijn abonnementen op het ontwikkelplatform: repositories, samenwerking, toegangsbeheer en eventueel bedrijfsidentiteiten.
- **Copilot Business en Copilot Enterprise** zijn AI-abonnementen. Copilot Business kan op een Free- of Team-organisatie én binnen Enterprise Cloud. Copilot Enterprise vereist Enterprise Cloud.
- **Enterprise Cloud + Copilot Business is dus een geldige combinatie:** bedrijfs-SSO vereist niet automatisch het duurdere Copilot Enterprise. De nieuwe Copilot-access-route is nog een afzonderlijk billingmodel met beperkte beschikbaarheid. [7–9]

**Wat houdt GitHub Free voor een organisatie in?**

Een Free-organisatie is een echte gedeelde organisatie, geen verzameling losse persoonlijke abonnementen. Ze kan onbeperkt medewerkers en publieke/private repositories hebben, teams gebruiken om repositorytoegang te verdelen, en een centraal betaald Copilot Business-abonnement afnemen. “Free” slaat op het GitHub-basisplan, **niet op gratis Copilot Business**. Copilot Free is juist een persoonlijk plan en geen centraal beheerd organisatieaanbod. [7–8, 24]

| GitHub-basisplan | Openbare basisprijs per gebruiker per maand | Relevante functies en beperkingen |
| --- | ---: | --- |
| **Free voor organisaties** | **$0** | Onbeperkt publieke/private repositories en medewerkers; teams voor repositorytoegang, Issues/Projects, Dependabot-updates, 500 MB Packages-opslag en communitysupport. Private repositories hebben beperktere samenwerkingsfuncties. Geen bedrijfs-SSO/SCIM. Een organisatie kan wel tweefactorauthenticatie verplichten. |
| **Team** | **$4** | Free plus onder meer verplichte reviews, beschermde branches, CODEOWNERS, private wiki's/Pages, uitgebreidere deployment-instellingen, 2 GB Packages-opslag en websupport. Geen Enterprise-SSO/SCIM; de meerprijs koopt vooral repository- en samenwerkingsfuncties, niet een beter Copilot-model. |
| **Enterprise Cloud** | **$21** | Team plus centraal beheer over meerdere organisaties, SAML-SSO, SCIM-provisioning, de optie Enterprise Managed Users, uitgebreidere auditmogelijkheden/auditlogstreaming, IP-beperkingen en aanvullende compliance-/beleidsfuncties. Deze mogelijkheden moeten nog worden ingericht. |

Bronnen: actuele prijspagina en plandocumentatie; opslag en compute hebben eigen limieten en oververbruikstarieven. Het aantal repositories is dus niet de enige kostenmaatstaf. Advanced Security, Codespaces, cloudagents/sandboxes en extra Actions-/opslaggebruik zijn niet ineens onbeperkt inbegrepen. [8, 22, 24, 28]

**Welke combinaties kun je kopen en wat kosten ze samen?**

Onderstaande bedragen zijn **vaste USD-lijstprijzen per persoon per maand**, exclusief belastingen, betaald AI-meerverbruik en infrastructuur. Waar een betaald GitHub-basisplan staat, veronderstelt de tabel dat dezelfde persoon ook die platformlicentie nodig heeft. Een inbegrepen AI-tegoed is verbruiksruimte, geen korting op de vaste factuur. [7–10]

| Combinatie | GitHub-basis | Copilot-seat | Vast totaal per persoon per maand | Inbegrepen gemeten AI-gebruik per maand |
| --- | ---: | ---: | ---: | --- |
| **GitHub Free + Copilot Business** | $0 | $19 | **$19** | $19 per seat, gepoold |
| **GitHub Team + Copilot Business** | $4 | $19 | **$23** | $19 per seat, gepoold |
| **GitHub Enterprise Cloud + Copilot Business** | $21 | $19 | **$40** | $19 per seat, gepoold |
| **GitHub Enterprise Cloud + Copilot Enterprise** | $21 | $39 | **$60** | $39 per seat, gepoold |
| **GitHub Enterprise Cloud + Copilot access** | $21 | $0 extra | **$21 + al het gemeten AI-gebruik** | Geen; alleen voor toegelaten sales-managed enterprises |
| **Copilot Standalone binnen de nieuwe access-route** | Geen betaalde Enterprise Cloud-gebruikerslicentie nodig | $10 | **$10 + al het gemeten AI-gebruik** | Geen; alleen binnen een toegelaten enterpriseaccount, niet zelfstandig op Free/Team |

**Copilot CLI én VS Code-autocompletion zijn inbegrepen in alle zes combinaties hierboven.** Dat geldt dus ook voor **GitHub Free + Copilot Business**; Team of Enterprise is hiervoor niet nodig. Bij access/Standalone blijven de genoemde toelatingsvoorwaarden gelden. GitHub vermeldt expliciet dat alle Copilot-plannen Copilot CLI omvatten; access/Standalone hebben dezelfde functie- en modelrechten als Copilot Enterprise. [9, 26]

- **Copilot CLI:** agentwerk in de terminal verbruikt AI credits. Business/Enterprise gebruiken eerst de inbegrepen pool; access/Standalone rekenen gemeten gebruik vanaf het eerste verzoek af. “CLI inbegrepen” betekent geen apart CLI-abonnement, **niet onbeperkt gratis CLI-gebruik**. [10]
- **Autocompletion in VS Code:** inline codesuggesties (“ghost text”) en next-edit suggestions zijn bij deze organisatieplannen **onbeperkt en zonder AI-creditverbruik** inbegrepen. Ze blijven beschikbaar bij een AI-gebruiksbudget van $0 of een bereikte harde bestedingslimiet. Copilot Chat en agentwerk in VS Code vallen hier niet onder: die verbruiken wel AI credits. [10, 26]
- **Toegang moet ingericht zijn:** een toegewezen Copilot-seat, aanmelden met het bijbehorende GitHub-account in CLI/VS Code, de benodigde clientintegratie en toestemmend organisatie-/enterprisebeleid. Een beheerder kan functies blokkeren; ook budgetten kunnen CLI-, chat- en agentgebruik stoppen. GitHub Free zonder Copilot Business is niet hetzelfde als deze combinatie. [7, 9–10, 26–27]

**Niet beschikbaar:** GitHub Free + Copilot Enterprise en GitHub Team + Copilot Enterprise. Bij de nieuwe access-route hebben Enterprise Cloud-gebruikers en Standalone-gebruikers dezelfde Copilot-functies/modellen als Copilot Enterprise, maar zonder inbegrepen AI credits. Standalone koopt geen betaalde Enterprise Cloud-repositoryrechten. De $10 dekt volgens GitHub ook identiteit, toegang, beleid en beheer binnen die enterprisecontext; tel dus niet automatisch nog $21 bovenop iedere Standalone-seat. De volledige enterprise moet wel voor één billingmodel kiezen: oude Business/Enterprise-billing en nieuwe access-billing kunnen daar niet naast elkaar bestaan. [9]

**Maandbetaling of jaarbetaling**

- **Copilot Business/Enterprise:** de openbare organisatiedocumentatie beschrijft maandelijkse seatbilling. Geen afzonderlijk openbaar jaarabonnement of jaarkorting vastgesteld. Een jaarcontract voor GitHub maakt Copilot niet automatisch jaarlijks goedkoper. Voor Standalone/access zijn eventuele jaarafspraken of minimumcommitments contractafhankelijk. [7, 9]
- **GitHub Team/Enterprise Cloud:** de actuele prijspagina vermeldt $4 respectievelijk $21 per gebruiker per maand, zonder afzonderlijk bevestigd jaartarief. De documentatie staat omschakelen naar jaarbetaling alleen toe bij een volumeplan dat beide cycli ondersteunt. Nieuwe Enterprise Cloud-accounts vallen in beginsel onder maandelijks gemeten licenties; bestaande volume-/jaarcontracten kunnen andere afspraken behouden. Controleer daarom de concrete accountoptie of offerte; presenteer geen historische jaarkorting als huidig aanbod. [8, 25]
- **Voor begrotingen, niet als jaarabonnement:** twaalf volledige maanden met gelijkblijvende seats kosten aan vaste lijstprijzen per persoon $228 voor Free + Business, $276 voor Team + Business, $480 voor Enterprise Cloud + Business, $720 voor Enterprise Cloud + Copilot Enterprise, $252 voor Enterprise Cloud + access of $120 voor Standalone. De laatste twee zijn nog **zonder enig gemeten AI-gebruik**. Deze bedragen beloven geen jaarlijkse afrekening of korting. [7–9, 25]

**Let op wie je moet meetellen.** Je koopt Copilot alleen voor toegewezen gebruikers, maar een betaald GitHub-basisplan rekent ook andere factureerbare platformgebruikers mee, zoals organisatieleden en bepaalde private-repositorycollaborators. Met `G` factureerbare platformgebruikers en `C` Copilot-gebruikers is de vaste maandrekening voor Team + Business `4 × G + 19 × C`, voor Enterprise Cloud + Business `21 × G + 19 × C` en voor Enterprise Cloud + Copilot Enterprise `21 × G + 39 × C`. Voorbeeld: 10 Team-gebruikers van wie 5 Copilot Business krijgen, kosten **$135 per maand**, niet $115. Bij al aanwezige Enterprise Cloud-licenties is alleen Copilot incrementeel; tel de platformkosten niet dubbel. [24]

**Zo werkt de interactieve keuzehulp.** Kies eerst de vereiste functies: private repositories, reviews/branchregels in private repositories, bedrijfs-SSO/SCIM, centraal GitHub-beheer over meerdere organisaties of modelprioriteit. Alle aangevinkte eisen gelden tegelijk. De matrix toont alleen passende combinaties, met apart de GitHub- en Copilot-prijs, inbegrepen AI-tegoed en maandkosten bij dezelfde gebruiksaanname. Gelijke, niet-gevraagde functies verdwijnen uit de matrix. Centraal Copilot-beheer, Copilot CLI en VS Code-autocompletion staan als gemeenschappelijke mogelijkheden boven de vergelijking; daarvoor is geen onderscheidend filter nodig. [9, 24, 26]

De rekenhulp heeft één veld **Aantal gebruikers**: iedereen in dat scenario krijgt Copilot én het eventueel betaalde GitHub-platform. De getoonde prijs is de volledige combinatie, niet een incrementele toeslag. Organisaties met verschillende aantallen platform- en Copilot-gebruikers gebruiken de formules hierboven; bestaande platformlicenties hoeven niet opnieuw gekocht te worden.

Reguliere aanschafroutes staan standaard aan. Access en Standalone verschijnen alleen na het aanvinken van routes via een accountteam; daadwerkelijke toelating blijft vereist. Beide access-varianten hebben dezelfde Copilot-functie- en modeltoegang als Copilot Enterprise, inclusief modelprioriteit, maar geen inbegrepen AI-tegoed. Standalone omvat zelf geen GitHub-repositoryrechten. SAML/SCIM voor Standalone is in de bekeken bronnen niet bevestigd: de keuzehulp noemt dit **te bevestigen**, niet afwezig, en telt het niet als match bij een verplichte SSO-eis. [9, 26]

**Copilot Business tegenover Copilot Enterprise**

| Onderdeel | Copilot Business | Copilot Enterprise |
| --- | --- | --- |
| GitHub-basisvereiste | Free, Team of Enterprise Cloud | Alleen Enterprise Cloud |
| Inbegrepen AI credits | 1.900 per seat, ter waarde van $19 | 3.900 per seat, ter waarde van $39 |
| Kernfuncties | Onder meer chat, inline suggesties, IDE-agent, CLI, cloudagent, code review, custom instructions en MCP | Dezelfde genoemde kerncategorieën |
| Organisatiebeheer | Seats, policies, modelbeleid, content exclusion en auditlogs | Ook aanwezig; niet exclusief voor dit duurdere Copilot-plan |
| Gepubliceerd extra voordeel | Breed modelaanbod | Meer inbegrepen credits en prioriteit bij nieuwe modellen en functies |

Dit is geen garantie dat iedere interface, previewfunctie of modelrelease op beide plannen tegelijk beschikbaar is. Wel is “Business heeft alleen autocomplete; Enterprise heeft agents en beheer” onjuist. De huidige vergelijking toont die kernfuncties ook bij Business. Content exclusion is bovendien geen universele beveiligingsgrens voor iedere agentsurface. [26]

**Welke combinatie is beheerbaar, en hoe?**

| Combinatie | Copilot-seats, beleid en kosten | Gebruikersidentiteit en toegang |
| --- | --- | --- |
| **Free + Business** | Organisatie-eigenaren wijzen seats toe aan geselecteerde gebruikers/teams of alle leden. Zij beheren Copilot-beleid, modellen en een organisatiebudget. | Persoonlijke GitHub-accounts met centraal beheerde organisatietoegang. Verplichte 2FA mogelijk; geen bedrijfs-SSO/SCIM of door het bedrijf beheerde accounts. |
| **Team + Business** | Hetzelfde Copilot-organisatiebeheer als Free + Business. | Hetzelfde identiteitsmodel, plus de uitgebreidere repositoryregels van Team. Team voegt geen bedrijfs-SSO/SCIM toe. |
| **Enterprise Cloud + Business** | Enterprise-eigenaren kunnen centraal beleid opleggen en seats rechtstreeks aan personen/enterpriseteams toewijzen, of Copilot per organisatie inschakelen. Ook gebruikers-, costcenter- en enterprisebudgetten. | SAML-SSO/SCIM en eventueel Enterprise Managed Users, afhankelijk van inrichting; centraal beheer over meerdere organisaties. |
| **Enterprise Cloud + Copilot Enterprise** | Hetzelfde enterpriseniveau voor beleid/budgetten. Enterprise-eigenaren schakelen Copilot in voor organisaties; organisatie-eigenaren verdelen daar de seats. | Dezelfde Enterprise Cloud-identiteitsopties; Copilot Enterprise is daarvoor niet de vereiste upgrade. |
| **Enterprise Cloud + access / Standalone** | Enterprise-eigenaren beheren de toewijzing aan personen, enterpriseteams of hele organisaties en de centrale gebruiksbudgetten. Elke gebruiker heeft een toegewezen seat nodig, ook bij $0 extra seatprijs. | Beheer via het toegelaten enterpriseaccount en diens ingestelde identiteitsroute. Standalone vereist geen betaalde Enterprise Cloud-gebruikerslicentie, maar is evenmin een onbeheerd persoonlijk abonnement. |

Bronnen en concrete inrichting: [9, 27–28].

1. **Seats in een Free/Team-organisatie:** open de organisatie → **Settings → Copilot → Access**. Kies alle leden of geselecteerde personen/teams. CSV en REST API zijn eveneens gedocumenteerd. Een toegewezen maar ongebruikte seat kost ook geld; verwijderen stopt niet automatisch alle kosten midden in een maand. [7, 27]
2. **Policies en modellen:** gebruik **Settings → Copilot → Policies / Models**. Binnen een enterprise kan een organisatie geen centraal afgedwongen beleid versoepelen. Deze Copilot-instellingen zijn iets anders dan repositoryregels of het beheer van persoonlijke GitHub-accounts. [27]
3. **Seats op enterpriseniveau:** gebruik **Billing & licensing → Licensing → Copilot → Access**. Met Enterprise Managed Users kunnen enterpriseteams aan IdP-groepen worden gekoppeld, zodat de seattoewijzing de groepsleden volgt. Dit vereist de bijbehorende inrichting; een abonnement activeert geen automatische Entra ID-koppeling. [27–28]
4. **Kosten begrenzen:** een zelfstandige organisatie heeft organisatiebudgetten; de enterprisebeheerder kan daarnaast gebruikers- en costcenterbudgetten instellen. Voor organisatie-/costcenter-/enterprisebudgetten moet **Stop usage when budget limit is reached** expliciet aan: standaard is dit géén harde stop. Gebruikersbudgetten op enterpriseniveau zijn wel harde limieten en tellen inbegrepen credits mee. Deze limieten stoppen geen seatkosten; inline completions/next-edit suggestions blijven zonder creditverbruik werken. [10, 27]
5. **Accounts beheren:** met persoonlijke accounts beheert het bedrijf de organisatietoegang, niet het persoonlijke account zelf. SAML-SSO is niet hetzelfde als accountbezit. Bij **Enterprise Managed Users** verzorgt de identityprovider de bedrijfsaccounts en hun levenscyclus; daartegenover staan beperkingen op samenwerking buiten de enterprise. Houd eventuele IdP-licentiekosten apart. [28]

**Praktische keuze:** voor centraal beheerde Copilot zonder bedrijfs-SSO is **Free + Business à $19** de laagste reguliere selfservice-instap. Koop Team voor de repositoryfuncties. Voor bedrijfs-SSO/SCIM kan **Enterprise Cloud + Business à $40** volstaan; Copilot Enterprise à $60 totaal is geen vereiste voor dat identiteitsbeheer. Heb je al Enterprise Cloud en toegang tot de nieuwe route, vergelijk dan **$0 extra seat + alle usage** met **$19/$39 extra seat + inbegrepen usage**, niet alleen de seattarieven.

### Lurus

| Individueel Lurus-plan | Maandprijs | Reguliere credits | Afzonderlijke Lura-credits |
| --- | ---: | ---: | ---: |
| Pro | €20 | €30 | €20 |
| Pro+ | €60 | €105 | €60 |
| Ultra | €200 | €400 | €200 |

De twee tegoedsoorten zijn niet onderling uitwisselbaar. Ultra adverteert Agent Teams & Orchestration; ga niet uit van identieke functies bij het goedkoopste abonnement. [11]

Team werkt anders: geen abonnement per seat, geen vaste inbegrepen maandcredits, maar een gedeelde wallet met ledenbudgetten en modelbeleid. **Omzetten naar Team is permanent.** Ongebruikt Team-tegoed en apart gekocht extra tegoed vervallen niet; inbegrepen individuele abonnementscredits vervallen volgens de actuele voorwaarden wél aan het einde van de maandelijkse tegoedperiode. [11–12]

### Nieuwe API-creditvoordelen: niet verwarren met de native agentbundel

De algemene uitspraak “een chatabonnement bevat nooit API-credits” is op deze peildatum te grof. Er zijn afzonderlijke, te activeren voordelen:

| Abonnement | Extra API-creditvoordeel | Voorwaarden en uitsluitingen |
| --- | --- | --- |
| ChatGPT Business | $20 per Standard- en $100 per Premium-seat per maand; maximaal $500 per workspace per maand | Eligible rollout, actief abonnement gedurende zeven dagen, koppelen/activeren voor één API-organisatie. **Codex via API-keys expliciet uitgesloten**; vergroot ook de ingelogde Codex-bundel niet. Jaarbetaling kent eigen grant-/vervalregels. [16] |
| Claude Team | $20 per Standard- en $100 per Premium-seat per maand; maximaal $500 gezamenlijk | Na zeven dagen claimen en koppelen aan één Console-organisatie. API Messages/Batch en eigen API-apps kunnen dit gebruiken; **interactieve Claude Code en native extra usage niet**. Maandelijkse vervaldatum, geen rollover. [17] |

**Toepassing op omp — [INFERENCE]:** gewone Anthropic Messages API-calls met een key uit die gekoppelde organisatie vallen onder de algemene API-dekking. De voordeelpagina noemt omp niet afzonderlijk. Het betreft API-gebruik, niet toestemming om Claude-abonnements-OAuth in omp te gebruiken. Trek credits niet als cashkorting van de seatfactuur af en tel ze niet tweemaal mee.

## 4. Modelkosten: harness en model apart begroten

Een *harness* stuurt model en tools aan. Het *modeltarief* bepaalt wat de verwerkte tokens kosten. Dezelfde harness kan met een goedkoop werkmodel of een duur redeneermodel draaien. Onderstaande selectie is geen volledige modelcatalogus en geen kwaliteitsrangschikking.

### Directe API: actuele standaardtarieven

**USD per miljoen tokens**, normale interactieve/Standard-route, vóór tools, regionale toeslagen en belastingen. `Cachewrite` vervangt voor die inputcategorie het gewone inputtarief; tel dezelfde tokens niet nogmaals als gewone input. Output omvat betaald denkwerk waar de provider dat als output rapporteert. [18]

| Model | Gewone input | Cacheread | Cachewrite, korte bewaartijd | Output |
| --- | ---: | ---: | ---: | ---: |
| OpenAI GPT-6.1 Sol | $2,00 | $0,10 | $2,50; 30 minuten | $10,00 |
| OpenAI GPT-6.1 Terra | $1,00 | $0,05 | $1,25; 30 minuten | $5,00 |
| OpenAI GPT-6 Luna | $0,10 | $0,01 | $0,125; 30 minuten | $0,50 |
| OpenAI GPT-5.3 Codex | $1,75 | $0,175 | Geen apart write-tarief vermeld | $14,00 |
| Anthropic Claude Opus 5.5 | $4,00 | $0,20 | $5,00; 5 minuten | $20,00 |
| Anthropic Claude Sonnet 5.5 | $2,00 | $0,10 | $2,50; 5 minuten | $10,00 |
| Anthropic Claude Haiku 5.5, prompt ≤100k | $0,10 | $0,01 | $0,125; 5 minuten | $0,50 |
| Google Gemini 4 Argon | $2,00 | $0,10 | Alleen impliciete caching | $10,00 |
| Google Gemini 3.8 Flash | $0,75 | $0,075 | Eventuele expliciete cacheopslag apart | $3,75 |
| Google Gemini 3.1 Flash-Lite, tekst | $0,25 | $0,025 | Eventuele expliciete cacheopslag apart | $1,50 |

Belangrijke tariefgrenzen:

- **OpenAI:** voor modellen met een aparte >272k-inputtier in de prijslijst gelden daar hogere API-tarieven: input/cachecategorieën 2×, output 1,5×. Langere cachebewaring kost meer. Ingelogde Codex heeft een **andere rate card**: geen cachewritekosten; Enterprise Codex met ChatGPT-aanmelding heeft geen 272k-contexttoeslag. API-prijzen zijn dus geen omrekentabel voor de inbegrepen abonnementscapaciteit. [3, 18]
- **Anthropic:** Haiku 5.5 boven 100k promptinput kost $0,50 gewone input / $2,50 output; de hele request krijgt het hogere tarief, inclusief cachecategorieën. Een uur cachewrite kost 2× gewone input in plaats van 1,25× bij vijf minuten. Fast Opus 5.5 verdubbelt het standaardtarief. [18]
- **Google:** Argons getoonde introductietarief verdubbelt op **1 december 2026**; Gemini 3.8 Flash op **1 januari 2027**. Expliciete Flash-cacheopslag kost nu $0,50 per miljoen token-uren; Flash-Lite $1,00. Een gratis API-tier kan andere datagebruiksvoorwaarden hebben en wordt hier niet als kosteloze zakelijke standaard aanbevolen. [18]
- **Copilot:** zijn eigen modelprijslijst is leidend, niet blind de upstream API-tabel. Voorbeelden op deze peildatum: GPT-6.1 Sol en Sonnet 5.5 $2 input / $10 output, Opus 5.5 $4 / $20, met afzonderlijke cachetarieven. Kortingen voor Auto/Fusion en regionale toeslagen zijn routegebonden; niet automatisch op omp of andere clients toepassen. [10]

### Lurus: let op de opslag bovenop de prijstabel

De FAQ op de modelkostenpagina zegt expliciet dat de getoonde waarden **providerbasistarieven** zijn en dat Lurus daar **100% opslag** bovenop zet. Onderstaande eindtarieven zijn daarom **berekend als 2× de getoonde bedragen**, zonder individuele bonuscredits. De openbare Team-pagina specificeert geen afzonderlijke bonusregeling; laat de werkelijke walletafschrijving contractueel bevestigen. [12]

| Lurus-modelroute | Getoonde basis: input / output per miljoen | Berekend na opslag: input / output | Berekende cacheread per miljoen |
| --- | --- | --- | ---: |
| Lura | €1,30 / €3,60 | **€2,60 / €7,20** | €0,70 |
| Claude Sonnet 5.5, EU | €2,20 / €11,00 | **€4,40 / €22,00** | €0,44 |
| Claude Opus 5.5, EU | €4,40 / €22,00 | **€8,80 / €44,00** | €0,44 |
| GPT-6.1 Sol, EU | €2,40 / €12,00 | **€4,80 / €24,00** | €0,24 |
| GPT-6.1 Sol, Global/VS | €2,00 / €10,00 | **€4,00 / €20,00** | €0,20 |
| GPT-6 Luna, EU | €0,12 / €0,60 | **€0,24 / €1,20** | €0,024 |

Eventuele cachewrites en andere AI-functies komen daar volgens hun eigen regels bij. De extra credits bij individuele plannen zijn al onderdeel van die pakketten: pas niet daarnaast nog eens dezelfde bonus als tariefkorting toe. Lurus is hier een leverancier met eigen routes en prijzen, niet slechts een neutrale valutaconversie van directe API-prijzen.

### Zo bereken je tokenkosten zonder dubbel te tellen

Sommeer over hoofdmodel, subagents en helperverzoeken:

`modelkosten = (gewone_input × inputtarief + cachewrites × writetarief + cachereads × readtarief + output × outputtarief) / 1.000.000`

De inputcategorieën overlappen niet. Als de outputteller redeneertokens al bevat, tel die niet nogmaals op. Pas daarna eventuele tegoeden, tools, compute, toeslagen en belastingen toe.

**Illustratief cachevoorbeeld, geen benchmark:** een Sonnet 5.5-taak verwerkt in totaal één miljoen inputtokens en 100.000 outputtokens. Alle input als vijfminuten-cachewrite kost samen **$3,50**. Met 90% cachereads en 10% nieuwe cachewrites kost dezelfde hoeveelheid tokens **$1,34**. Er worden dus evenveel tokens verwerkt, maar de prijs verschilt sterk. Dit voorspelt niet welke harness deze cachehitratio haalt. [18]

## 5. Hoe snel verbruiken de harnesses tokens tegenover omp?

### Er bestaan directe metingen, maar geen algemene omrekenfactor

Strands publiceerde op 13 oktober een vergelijking op een **snapshot van 17 september 2026**. Er werden dezelfde model/benchmarkcombinaties per provider vergeleken, met hoge redeneerinstelling. De volledige studie telt circa 94.000 runs; de onderstaande matched sets bevatten 8.240 runs per harness voor Anthropic en 6.180 voor OpenAI. Het gaat om acht benchmarkfamilies, zowel code als andere agenttaken. [19]

| Matched modelgroep | Harness | Gemiddeld input + output per run | Geschatte modelkosten per run | Score, fouten uitgesloten |
| --- | --- | ---: | ---: | ---: |
| Claude Fable 5, Opus 5/4.8, Sonnet 5 | Claude Code | 1.645.000 tokens | $1,574 | 79,28% |
| Dezelfde Anthropic-set | omp | 1.319.000 tokens | $1,074 | 78,22% |
| GPT-5.6 Luna/Sol/Terra | Codex | 789.000 tokens | $0,362 | 69,72% |
| Dezelfde OpenAI-set | omp | 1.199.000 tokens | $0,492 | 69,73% |

Binnen **deze** Anthropic-set gebruikte Claude Code ongeveer **1,25×** zoveel tokens als omp, met een iets hogere score. Binnen **deze** OpenAI-set gebruikte Codex ongeveer **0,66×** zoveel tokens als omp. Het bewijs ondersteunt dus niet de aanname dat alle native harnesses sneller tokens verbranden dan omp.

Beperkingen: Strands is zelf harnessleverancier; een deel van de dollarkosten is geschat omdat factuurdata ontbraken; de resultaten isoleren cache-, context- en tooloorzaken niet. De scores sluiten errored runs uit, terwijl de kostennoemer alle trials bevat. Dit is geen actuele GPT-6.1/Claude-5.5-seatbenchmark, geen tokens-per-seconde-meting en geen onafhankelijk door ons herhaald experiment. Vergelijk de twee modelgroepen niet onderling als één ranglijst.

Een tweede bron toont waarom de workload ertoe doet. Composio gebruikte **Kimi K3 via OpenRouter, maximale reasoning en business-app/MCP-taken**, niet de native modelroute van Codex of Claude Code. [20]

| Composio-studie, 4 augustus 2026 | Geslaagde taken van 25 | Geschatte kosten per succes, gedeelde usage-set van 24 taken |
| --- | ---: | ---: |
| omp | 22 | $0,52 |
| Codex | 17 | $0,66 |
| Claude Code | 19 | $1,96 |

Dat is nuttig extern-modelbewijs, maar geen zakelijke offerte of representatieve native codingvergelijking. De andere volgorde dan in de OpenAI-set is geen tegenspraak: model, taken en configuratie verschillen.

**Copilot en Lurus:** in de geraadpleegde bronnen is geen gecontroleerde directe tokenvergelijking met omp gevonden die een verantwoord algemeen percentage oplevert. Een ontbrekende meting betekent *onbekend*, niet gelijk verbruik.

### De omp-claim “61% minder tokens” heeft een veel smallere betekenis

Het door de omp-maker gepubliceerde edit-experiment vergelijkt patch/replace/hashline op React-bestandsmutaties: 180 taken, drie runs per configuratie, verse sessies. De genoemde **61% daling betreft Grok 4 Fast-outputtokens**, doordat minder editpogingen mislukten. Dat is **geen** 61% besparing op alle input+output, alle modellen, maandfacturen of Copilot-/Codex-/Claude-abonnementen. De huidige productversies zijn evenmin allemaal in die proef getest. [21]

### Waardoor kan het verbruik in de praktijk oplopen?

| Mechanisme | Gevolg voor native harnesses én vergelijking met omp |
| --- | --- |
| Opnieuw meesturen van context | Bestanden, instructies, toolbeschrijvingen en eerdere resultaten kunnen bij elke modelstap terugkomen. omp kan reads samenvatten; ook Codex/Claude/Copilot hebben contextbeheer. Alleen meten bewijst de nettobesparing. |
| Denken en output | Een hogere redeneerinstelling kan veel betaalde tokens opleveren zonder lange zichtbare antwoorden. Goedkope input maakt een dure outputstroom niet gratis. |
| Subagents, fleet en reviewers | Meer actieve modelcontexten kunnen sneller klaar zijn én meer tokens per minuut verwerken. omp kan goedkope modellen per rol kiezen, maar native harnesses ondersteunen eveneens modelkeuze/delegatie; geen uniek gratis voordeel. |
| Compaction | Vermindert latere context, maar vraagt zelf modelwerk en kan een cache opnieuw laten opbouwen. Geen vast besparingspercentage. |
| Caching | Meer cachehits kan geld besparen zonder minder totale tokens. Claude gebruikt voor inbegrepen interactieve subscription-turns andere standaardcachebewaring dan voor API/extra usage en subagents. |
| omp-cachewarming en achtergrondwerk | Warming herhaalt onder voorwaarden een request met klein outputbudget; kan tokens toevoegen om een duurdere cachemiss te vermijden. Advisors, geheugen en helpers moeten eveneens in de meting zitten. |
| Retry-/editlussen | Een foutieve patch of verloren context kan extra reads, output en herstelverzoeken veroorzaken. De invloed hangt af van model én toolformaat. |
| Providerroute | Ingelogde Codex, directe API, Copilot en Lurus kunnen voor vergelijkbare tokens verschillende regels/tarieven hanteren. Een lokale USD-schatting is niet automatisch de factuur. |

Onderbouwing: officiële context-/kosten-/cache-documentatie en de beschreven benchmarks. [3, 6, 14, 18–21]

**Tijd tot uitputting is daarom niet uit een seatprijs af te leiden.** Voor een API-budget kun je na meting rekenen met `resterend budget / werkelijk gemeten kosten per actief uur`. Voor tokenverbruik gebruik je `totale tokens / actieve tijd`, apart van kosten en kwaliteit. Voor abonnementen gelden daarnaast de eigen vijfuur-/weeklimieten en verbruiksregels; er is geen betrouwbare algemene omzetting naar “zoveel werkdagen per seat”.

## 6. Kan omp de abonnementen van de anderen gebruiken?

omp documenteert technische loginroutes voor onder meer ChatGPT/Codex, Claude en Copilot. **Technische compatibiliteit is geen licentietoestemming en geen garantie op dezelfde quota of korting.** [14–15]

| Provider | Wat de leveranciersbronnen werkelijk onderbouwen | Veilige begrotingsaanname voor een organisatie |
| --- | --- | --- |
| OpenAI | Ondersteunt inmiddels expliciete *Sign in with ChatGPT*-plansharing voor geschikte open-source/lokale apps, met eigen registratie, toestemming en host-ID. De directory noemt **Pi**, niet daarmee automatisch de fork **omp**. | Niet aannemen dat een Business-seat zonder verdere controle officieel in omp herbruikbaar is. API-route begroten, of de specifieke ondersteunde integratie en organisatievoorwaarden vaststellen. |
| Anthropic | Subscription-OAuth is bedoeld voor Claude Code/native apps; derde partijen mogen niet zomaar Claude.ai-login/tokens als eigen inferenceroute aanbieden. Hosting van de **ongewijzigde Claude Code-binary** is een andere, beschreven situatie. | Direct omp met organisatie-API-key of ondersteunde cloudprovider, tenzij afzonderlijk overeengekomen. Mogelijke API-creditdekking uit §3 is geen OAuth-vrijstelling. |
| GitHub | Ondersteunt derdepartij-OAuth via de officiële Copilot SDK. Dat bevestigt niet automatisch omps eigen proxy-/OAuth-clientimplementatie. | Goedkeuring/support voor die specifieke route is onbevestigd. **[INFERENCE]** werkende geauthenticeerde requests kunnen bestaande Copilotcredits en meerverbruik aanspreken; geen gratis extra omp-pot veronderstellen. |
| Lurus | Heeft een expliciete compatibiliteits-API met Lurus-key en voldoende tegoed. De API levert inferentie, niet de complete Lurus-agentruntime. | Eventuele omp-koppeling als modelgateway op Lurus-verbruik begroten; protocol-/toolcompatibiliteit eerst verifiëren, niet als geteste integratie presenteren. |

De openbare documentatie bevestigt dus niet de eenvoudige rekensom “koop overal het goedkoopste consumentenabonnement en gebruik dat onbeperkt in omp”. [12, 15]

## 7. Overige kosten die niet in de seatprijs verdwijnen

| Kostenpost | Wanneer relevant | Wat meenemen? |
| --- | --- | --- |
| Copilot-cloudsandbox | Cloudagent/CLI-cloudmodus, niet gewone lokale CLI | Los van AI credits: $0,000024 per compute-seconde, $0,000003 per GiB-seconde RAM en $0,005 per GiB-maand snapshotopslag volgens de billingpagina. Compute/RAM kunnen uit de gedeelde GitHub-computeallowance komen. De conceptpagina noemt vCPU-seconden waar de billingpagina compute-seconden noemt: multivCPU-afrekening bevestigen. [22] |
| GitHub Actions / code review | Action-uitvoering en onder meer Copilot code review | Extra compute naast modelcredits. Standaard Linux x64 2-core staat op $0,006 per minuut na inbegrepen gebruik; runnerkeuze wijzigt dit. Eigen runners hebben eigen infrastructuurkosten. [22] |
| GitHub-planallowance | Actions en geschikte sandboxcompute samen | Gedeelde maandwaarde per billingentiteit: Free-organisatie $12, Team $18, Enterprise Cloud $300. **Niet per Copilot-seat** en geen modelcredits; ander gebruik kan dit al opgebruiken. [22] |
| Codex Cloud | Native cloudtaken | Normaal cloudgebruik spreekt de plan-/creditroute aan; geen aparte algemeen verplichte VM-seatprijs gevonden. Grotere/custom Enterprise-omgevingen: offerte. API-containertarieven niet zomaar als Codex Cloud-toeslag toepassen. [3] |
| Betaalde zoek-/MCP-/API-tools | Alle harnesses, vooral eigen API/gatewayopzet | Zoekcalls, hosted tools, opslag, externe SaaS-licenties en eventueel browser-/cloudomgeving volgens hun eigen tarieven. Een toolaanroep kan zowel modeltokens als een externe fee veroorzaken. [14, 18] |
| Lokale/self-hosted modellen | omp en andere BYOK/lokale clients | Hardware/GPU, stroom, hosting, onderhoud en eventueel modelspecifieke licentie; “geen API-factuur” betekent niet gratis. |
| Beheer en menselijke correctie | Iedere organisatie-uitrol | Configuratie, toegangsbeheer, securityreview en controle van opgeleverde wijzigingen. Geen fictief bedrag opgenomen: deze organisatiekosten zijn niet gemeten. |

Copilot documenteert bovendien **lokale BYOK zonder Copilot-abonnement** in ondersteunde clients, waaronder de CLI: dan betaalt de provider/local server de inferentieroute, niet een inbegrepen Copilotbundel. Centrale enterprise-custom-modelconfiguratie is een ander pad, met eigen licentie-/beleidsvoorwaarden. Dit is een reëel alternatief voor incidenteel API-gebruik, maar niet hetzelfde als het volledige beheerde Copilot Business-aanbod. [23]

## 8. Aankoopadvies en meetplan

1. **Voor reguliere selfservice met centrale seats:** vergelijk Copilot Business met Standard bij ChatGPT Business en Claude Team. Koop geen GitHub Enterprise, ChatGPT Premium of Claude Premium alleen omdat een agent gebruikt moet worden. Kies zwaardere tiers voor aantoonbaar benodigde functies of capaciteit.
2. **Voor incidenteel gebruik:** vergelijk Lurus Team en API-billing via omp óf de native CLI. Nul seatkosten is aantrekkelijk bij inactieve gebruikers, maar de meter loopt bij actieve taken. Bij Lurus de opslag en feitelijke walletafschrijving expliciet controleren.
3. **Voor bestaande GitHub Enterprise-contracten:** vraag naar toegang tot Copilot access en vergelijk werkelijk totaalgebruik, niet alleen de lagere seatprijs. Houd rekening met enterprisebrede migratie en verlies van inbegrepen credits.
4. **Voor Anthropic in omp:** gebruik de zakelijke API-route; claim alleen werkelijk beschikbare API-credits en bewaak de aparte Console-rekening. Gebruik een technisch werkende subscriptionconnector niet als contractuele grondslag.
5. **Voor een verdedigbare harnesskeuze:** voer een kleine, representatieve proef uit met dezelfde repositorysnapshot, taken en acceptatiecriteria. Houd waar mogelijk modelversie, reasoning, provider, cachecondities en tools gelijk. Waar dat niet kan, rapporteer een productvergelijking in plaats van een zuivere harnessvergelijking.

Meet daarbij gewone input, cachereads/-writes, output inclusief denken, alle subagents/helpers, achtergrondverbruik, retries en mislukte runs. Registreer daarnaast quota-afschrijving, echte factuur, doorlooptijd, menselijke herstelarbeid en aantal **geaccepteerde** taken. Rapporteer zowel euro/dollar per succesvolle taak als tokens per taak; alleen tokens per minuut beloont mogelijk juist een dure parallelle workflow.

**Kostenbeheersing:** zet providerbudgetten en policies expliciet. Een lokale omp-costlimiet is geen gegarandeerd organisatiebreed factuurplafond: in-flight requests kunnen doorlopen en achtergrondgeheugen valt volgens de huidige documentatie niet volledig onder die sessielimiet. Ook native producten kunnen een laatste request pas achteraf afrekenen. [6, 14]

## Onderzoeksnotities in het Engels

De notities bewaren broncitaten, extra tarieven, effectieve data, conflicten en onzekerheden. De hierboven beschreven benchmarks zijn geraadpleegd, **niet door ons opnieuw uitgevoerd**. Er zijn geen benchmark- of factuurproeven met de onderzochte producten uitgevoerd en geen abonnementen aangekocht.

- [OpenAI / Codex](research/openai.en.md)
- [Anthropic / Claude Code](research/anthropic.en.md)
- [GitHub Copilot](research/copilot.en.md)
- [Lurus, omp en Google](research/lurus-omp.en.md)

## Bronnen

Alle onderstaande bronpagina's zijn tijdens dit onderzoek geraadpleegd. Prijzen en rolloutvoorwaarden kunnen na de peildatum wijzigen.

- **[1] OpenAI Business:** [Actueel overzicht, seatprijzen en minimum](https://help.openai.com/en/articles/8792828-chatgpt-business-overview) · [Business-prijspagina](https://openai.com/business/pricing/).
- **[2] Codex-only / legacy:** [Aankondiging met correctie van 24 juni](https://openai.com/index/codex-flexible-pricing-for-teams/) · [Legacy Business-seats](https://help.openai.com/en/articles/20001492-managing-legacy-codex-seats-in-chatgpt-business) · [Enterprise-contractafhankelijkheid](https://help.openai.com/en/articles/8265053-what-is-chatgpt-enterprise).
- **[3] Codex-billing en gebruik:** [Prijsgids](https://learn.chatgpt.com/docs/pricing) · [Authenticatie](https://learn.chatgpt.com/docs/auth.md) · [Credit-rate-card](https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu-credit-based-pricing) · [Flexibele pricing](https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans) · [Aangekondigde usagewijzigingen](https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits) · [Prepaid API](https://help.openai.com/en/articles/8264644-setting-up-and-managing-prepaid-api-billing) · [Cloudomgevingen](https://learn.chatgpt.com/docs/environments/cloud-environments.md).
- **[4] Claude-plannen:** [Pricing](https://claude.com/pricing) · [Team: prijzen en minimum](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) · [Team-seattypes en Code](https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans) · [Pro](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan).
- **[5] Claude Enterprise:** [Actuele seat- en usagebilling](https://support.claude.com/en/articles/11526368-how-am-i-billed-for-my-enterprise-plan).
- **[6] Claude Code-kosten:** [Kosten en richtbedragen](https://code.claude.com/docs/en/costs) · [Authenticatie en Console-route](https://code.claude.com/docs/en/authentication) · [Extra usage credits](https://support.claude.com/en/articles/12005970-manage-usage-credits-for-team-and-seat-based-enterprise-plans) · [Promptcaching en subagents](https://code.claude.com/docs/en/prompt-caching).
- **[7] Copilot-seats:** [Prijzen en billingcycli](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles) · [Licenties en persoonlijke plannen](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses).
- **[8] GitHub-basisproduct:** [Business instellen voor Free/Team-organisaties](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-organization) · [GitHub-prijzen](https://github.com/pricing).
- **[9] Nieuwe Copilot-access-route:** [Voorwaarden, rollout en vergelijking](https://docs.github.com/en/copilot/get-started/whats-changing-with-github-enterprise-and-copilot) · [Aankondiging 28 oktober](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/).
- **[10] Copilot-verbruik:** [Organisatiebilling en pooling](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) · [Modeltarieven](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) · [Persoonlijke billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing) · [Invoering 1 juni](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/).
- **[11] Lurus-aanbod:** [Abonnementen en Team-wallet](https://code.lurus.ai/en/pricing/) · [Teambeheer](https://code.lurus.ai/en/features/team-management/).
- **[12] Lurus-afrekening:** [Modelbasistarieven en 100%-opslag](https://code.lurus.ai/en/docs/models-costs/) · [Voorwaarden, oktober 2026](https://code.lurus.ai/en/terms/) · [Compatibiliteits-API](https://code.lurus.ai/en/features/openai-compatible-api/).
- **[13] omp-licentie:** [MIT](https://raw.githubusercontent.com/can1357/oh-my-pi/main/LICENSE).
- **[14] omp-werking:** [README](https://raw.githubusercontent.com/can1357/oh-my-pi/main/README.md) · [Providerroutes](https://omp.sh/docs/providers) · [Settings, warming en costlimieten](https://raw.githubusercontent.com/can1357/oh-my-pi/main/docs/settings.md).
- **[15] Derdepartijauthenticatie:** [OpenAI open-source plansharing](https://developers.openai.com/siwc/token-sharing-open-source.md) · [OpenAI-integratiedirectory](https://learn.chatgpt.com/docs/sign-in-with-chatgpt.md) · [Anthropic juridische grenzen](https://code.claude.com/docs/en/legal-and-compliance) · [GitHub SDK-authenticatie](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate) · [omp-specifieke transportdetails, vastgelegde versie](https://raw.githubusercontent.com/can1357/oh-my-pi/0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0/docs/provider-quirks.md).
- **[16] OpenAI API-creditvoordeel:** [Voorwaarden en Codex-uitsluiting](https://help.openai.com/en/articles/20001626-api-credits-benefit-for-eligible-chatgpt-subscriptions).
- **[17] Anthropic API-creditvoordeel:** [Voorwaarden en uitsluitingen](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans) · [Aankondiging 7 oktober](https://www.anthropic.com/claude-haiku-5-5).
- **[18] Directe modeltarieven:** [OpenAI](https://developers.openai.com/api/docs/pricing.md) · [OpenAI-cacheregels](https://developers.openai.com/api/docs/guides/prompt-caching.md) · [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) · [Google](https://aistudio.google.com/docs/pricing).
- **[19] Strands-harnessstudie:** [Methodologie, 13 oktober](https://strandsagents.com/blog/we-ran-94000-trials-to-measure-the-cost-of-harness-choice/) · [Anthropic-chartdata](https://strandsagents.com/embeds/anthropic-comparison.html) · [OpenAI-chartdata](https://strandsagents.com/embeds/openai-comparison.html).
- **[20] Composio:** [Kimi K3, acht harnesses, business-app-taken](https://composio.dev/content/best-ai-agent-harnesses).
- **[21] omp-makerbenchmark:** [The Harness Problem, 12 februari](https://blog.can.ac/2026/02/12/the-harness-problem/).
- **[22] GitHub-infrastructuur:** [Cloud/local sandboxbilling](https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes) · [Cloudsandboxconcepten](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) · [Actions-billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) · [Inbegrepen gebruik per GitHub-plan](https://docs.github.com/en/billing/reference/product-usage-included).
- **[23] Copilot BYOK:** [Lokale en centrale routes](https://docs.github.com/en/copilot/concepts/models/bring-your-own-key) · [Enterprise-custom-modellen](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/enable-custom-models).
- **[24] GitHub-plannen en licentietelling:** [Planfuncties](https://docs.github.com/en/get-started/learning-about-github/githubs-plans) · [Welke gebruikers een platformlicentie verbruiken](https://docs.github.com/en/billing/reference/github-license-users).
- **[25] GitHub-jaarbetaling en contracttypen:** [Billingcyclus wijzigen](https://docs.github.com/en/billing/how-tos/manage-plan-and-licenses/change-billing-cycle) · [Billingcycli](https://docs.github.com/en/billing/concepts/billing-cycles) · [Maandelijks gemeten Enterprise-licenties versus volumecontracten](https://docs.github.com/en/billing/concepts/enterprise-billing/usage-based-licenses).
- **[26] Copilot-functies per plan:** [Actuele vergelijking van persoonlijke en organisatieplannen](https://docs.github.com/en/copilot/get-started/plans) · [VS Code-inline completions en next-edit suggestions](https://code.visualstudio.com/docs/editing/ai-powered-suggestions) · [Copilot CLI instellen en aanmelden](https://docs.github.com/en/copilot/get-started/cli-quickstart).
- **[27] Copilot-beheer:** [Seats in organisaties](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access) · [Organisatiebeleid en modellen](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) · [Seats in enterprises](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access) · [Budgettypen en harde stops](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets).
- **[28] GitHub-identiteitsbeheer:** [Enterprise Managed Users](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users) · [2FA verplichten binnen een organisatie](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization).
