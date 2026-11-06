/* Eén onderwerp tegelijk. De bestaande HTML is de enige bron voor productclaims. */
(() => {
  'use strict';

  // Titel en producttekst komen uit de tabellen; hier staat alleen de leeswijzer.
  const onderwerpen = [
    { id: 'overzicht', groep: 'Begin hier', symbool: '>_', kort: 'Profiel & omgeving', vraag: 'Waar werk je, en hoe past de agent daarin?', tip: 'Een terminal, editor en cloudagent zijn verschillende werkomgevingen. Dezelfde productnaam betekent niet overal dezelfde mogelijkheden.' },
    { id: 'veiligheid', groep: 'De basis', symbool: '◇', kort: 'Veiligheid', vraag: 'Wat mag de agent doen zonder jou opnieuw te vragen?', tip: 'Een planmodus, een sandbox en een goedkeuringsvraag zijn niet hetzelfde. Kijk naar de precieze bevoegdheden, niet alleen naar de naam van de modus.' },
    { id: 'instructies', groep: 'De basis', symbool: '≡', kort: 'Projectinstructies', vraag: 'Hoe geef je de agent de regels van jouw project mee?', tip: 'Projectinstructies sturen gedrag. Ze zijn op zichzelf geen beveiligingsgrens.' },
    { id: 'skills', groep: 'Sturen & uitbreiden', symbool: '✧', kort: 'Skills', vraag: 'Hoe maak je een werkwijze herbruikbaar?', tip: 'Let op het verschil tussen een losse skill en een pakket dat ook andere uitbreidingen bundelt.' },
    { id: 'mcp', groep: 'Sturen & uitbreiden', symbool: '⌘', kort: 'MCP-koppelingen', vraag: 'Hoe sluit je externe tools en informatiebronnen aan?', tip: 'MCP-ondersteuning zegt nog niet hoe configuratie en toegang in elke werkomgeving geregeld zijn.' },
    { id: 'plugins', groep: 'Sturen & uitbreiden', symbool: '⊞', kort: 'Plugins & extensions', vraag: 'Wat kun je als pakket toevoegen, en wat kun je zelf programmeren?', tip: 'Een installeerbaar pakket en een programmeerbaar extensiesysteem zijn niet automatisch gelijkwaardig.' },
    { id: 'hooks', groep: 'Sturen & uitbreiden', symbool: '↳', kort: 'Hooks', vraag: 'Waar kun je op gebeurtenissen in de workflow reageren?', tip: 'Vergelijk welke gebeurtenissen beschikbaar zijn én welke acties een hook mag uitvoeren.' },
    { id: 'mods', groep: 'Sturen & uitbreiden', symbool: '⌁', kort: 'Mods & runtime', vraag: 'Kun je het gedrag van de agent van binnenuit aanpassen?', tip: '“Niet bevestigd” betekent niet “onmogelijk”. Het brondocument bevestigt alleen geen gelijkwaardig alternatief.' },
    { id: 'subagents', groep: 'De workflow', symbool: '⑂', kort: 'Subagents', vraag: 'Hoe verdeel je werk over meerdere agents?', tip: 'Let op het onderscheid tussen read-only specialisten, uitvoerende agents en de orkestratie die ze aanstuurt.' },
    { id: 'debugging', groep: 'De workflow', symbool: '◎', kort: 'Debugging & verificatie', vraag: 'Hoe controleer je of de wijziging echt werkt?', tip: 'Een test uitvoeren, een browser bedienen en een debugger aansluiten zijn drie verschillende vormen van verificatie.' },
    { id: 'sessies', groep: 'De workflow', symbool: '↺', kort: 'Context & sessies', vraag: 'Hoe ga je verder als een gesprek lang wordt of een andere richting uitgaat?', tip: 'Een gesprek terugspoelen betekent niet automatisch dat bestandswijzigingen ook worden teruggedraaid.' },
    { id: 'automatisering', groep: 'De workflow', symbool: '→', kort: 'Automatisering', vraag: 'Hoe gebruik je de agent zonder een interactief gesprek?', tip: 'Vergelijk de aansturing en uitvoerformaten die je script of CI-proces nodig heeft.' },
    { id: 'kosten', groep: 'Verbruik', symbool: '◴', kort: 'Tokens & kosten', vraag: 'Wat kun je zien en vergelijken over het verbruik?', tip: 'Geen betrouwbaar gezamenlijk klassement voor snelheid, kwaliteit of tokenverbruik beschikbaar. Vergelijk dezelfde taak en houd rekening met prijs- en abonnementsverschillen.' },
  ];
  const routes = [
    { naam: 'Vrij verkennen', uitleg: 'Alle onderwerpen', stappen: null },
    { naam: 'Veilig beginnen', uitleg: 'Regels → rechten → controle', stappen: ['instructies', 'veiligheid', 'debugging'] },
    { naam: 'Mijn agent uitbreiden', uitleg: 'Skills → tools → runtime', stappen: ['skills', 'mcp', 'mods'] },
    { naam: 'Groter werk aanpakken', uitleg: 'Verdelen → context → automatiseren', stappen: ['subagents', 'sessies', 'automatisering'] },
  ];
  const agents = [
    { naam: 'Codex', teken: 'Cx', profiel: 'Terminal · editor · cloud' },
    { naam: 'Claude Code', teken: 'Cl', profiel: 'Terminal · editor' },
    { naam: 'Copilot', teken: 'Co', profiel: 'CLI · editor · cloud' },
    { naam: 'Lurus Code', teken: 'Lu', profiel: 'Lurus-platform' },
    { naam: 'omp', teken: 'om', profiel: 'Terminal · extensies' },
  ];
  const vind = selector => document.querySelector(selector);
  const broninhoud = vind('#broninhoud');
  const kaarten = [...broninhoud.querySelectorAll('.vergelijk-kaart')];
  const gekozenAgents = new Set(agents.map(agent => agent.naam));
  let huidig = onderwerpen.find(onderwerp => `#${onderwerp.id}` === location.hash) || onderwerpen[0];
  let actieveRoute = 0;
  let passendeOnderwerpen = onderwerpen;

  // Lees de inhoud eenmaal in. Geen tweede verzameling productteksten onderhouden.
  onderwerpen.forEach((onderwerp, index) => {
    const kaart = kaarten[index];
    onderwerp.titel = kaart.querySelector('h3').textContent;
    onderwerp.velden = [...kaart.querySelectorAll('thead th')].slice(1).map(kop => kop.textContent);
    onderwerp.rijen = new Map([...kaart.querySelectorAll('tbody tr')].map(rij => [rij.dataset.agent, [...rij.querySelectorAll('td')].map(cel => cel.innerHTML)]));
    onderwerp.zoektekst = normaliseer(`${onderwerp.kort} ${onderwerp.vraag} ${kaart.textContent}`);
  });

  function normaliseer(tekst) {
    return tekst.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function maakKnop(tekst, klasse, actie) {
    const knop = document.createElement('button');
    knop.type = 'button';
    knop.className = klasse;
    knop.textContent = tekst;
    knop.addEventListener('click', actie);
    return knop;
  }

  function kiesOnderwerp(onderwerp, wijzigAdres = true) {
    huidig = onderwerp;
    if (wijzigAdres) location.hash = onderwerp.id;
    tekenOnderwerp();
    tekenNavigatie();
    vind('.vergelijk-ruimte').scrollTop = 0;
  }

  function tekenNavigatie() {
    const lijst = vind('#onderwerplijst');
    lijst.replaceChildren();
    let vorigeGroep = '';
    for (const onderwerp of passendeOnderwerpen) {
      if (onderwerp.groep !== vorigeGroep) {
        const kop = document.createElement('p');
        kop.className = 'nav-groep';
        kop.textContent = onderwerp.groep;
        lijst.append(kop);
        vorigeGroep = onderwerp.groep;
      }
      const knop = maakKnop(onderwerp.kort, 'onderwerp-knop', () => {
        actieveRoute = 0;
        tekenRoutes();
        kiesOnderwerp(onderwerp);
        lijst.querySelector('[aria-current]')?.focus({ preventScroll: true });
      });
      const symbool = document.createElement('span');
      symbool.textContent = onderwerp.symbool;
      symbool.setAttribute('aria-hidden', 'true');
      knop.prepend(symbool);
      if (huidig === onderwerp) knop.setAttribute('aria-current', 'true');
      lijst.append(knop);
    }
  }

  function tekenAgents() {
    const keuze = vind('#agentkeuze');
    keuze.replaceChildren();
    for (const agent of agents) {
      const knop = maakKnop('', 'agent-knop', () => {
        if (gekozenAgents.has(agent.naam)) gekozenAgents.delete(agent.naam);
        else gekozenAgents.add(agent.naam);
        // Werk de bestaande knop bij zodat toetsenbordfocus behouden blijft.
        knop.setAttribute('aria-pressed', String(gekozenAgents.has(agent.naam)));
        tekenOnderwerp();
      });
      knop.setAttribute('aria-pressed', String(gekozenAgents.has(agent.naam)));
      knop.setAttribute('aria-label', agent.naam);
      const teken = document.createElement('span');
      teken.className = 'mini-monogram';
      teken.textContent = agent.teken;
      teken.setAttribute('aria-hidden', 'true');
      const naam = document.createElement('span');
      naam.textContent = agent.naam;
      const vink = document.createElement('span');
      vink.className = 'selectie-teken';
      vink.setAttribute('aria-hidden', 'true');
      knop.append(teken, naam, vink);
      keuze.append(knop);
    }
  }

  function tekenRoutes() {
    const balk = vind('#routes');
    balk.replaceChildren();
    routes.forEach((route, index) => {
      const knop = maakKnop('', 'route-knop', () => {
        actieveRoute = index;
        vind('#zoekterm').value = '';
        passendeOnderwerpen = onderwerpen;
        vind('#zoek-status').textContent = '';
        tekenRoutes();
        kiesOnderwerp(route.stappen ? onderwerpen.find(item => item.id === route.stappen[0]) : onderwerpen[0]);
        vind('#routes').children[index].focus({ preventScroll: true });
      });
      knop.setAttribute('aria-pressed', String(actieveRoute === index));
      const naam = document.createElement('strong');
      naam.textContent = route.naam;
      const uitleg = document.createElement('small');
      uitleg.textContent = route.uitleg;
      knop.append(naam, uitleg);
      balk.append(knop);
    });
  }

  function volgorde() {
    const stappen = routes[actieveRoute].stappen;
    return stappen ? stappen.map(id => onderwerpen.find(item => item.id === id)) : passendeOnderwerpen;
  }

  function tekenOnderwerp() {
    vind('#onderwerp-groep').textContent = huidig.groep;
    vind('#onderwerp-titel').textContent = huidig.kort;
    vind('#onderwerp-vraag').textContent = huidig.vraag;
    vind('#onderwerp-symbool').textContent = huidig.symbool;
    vind('#aandachtspunt').textContent = huidig.tip;
    vind('#leeg').hidden = gekozenAgents.size > 0;
    const rooster = vind('#agentkaarten');
    rooster.replaceChildren();
    rooster.dataset.aantal = gekozenAgents.size;

    for (const agent of agents.filter(item => gekozenAgents.has(item.naam))) {
      const kaart = document.createElement('article');
      kaart.className = 'agent-kaart';
      const kop = document.createElement('header');
      const monogram = document.createElement('span');
      monogram.className = 'monogram';
      monogram.textContent = agent.teken;
      monogram.setAttribute('aria-hidden', 'true');
      const titelblok = document.createElement('div');
      const titel = document.createElement('h3');
      titel.textContent = agent.naam;
      const profiel = document.createElement('p');
      profiel.textContent = agent.profiel;
      titelblok.append(titel, profiel);
      kop.append(monogram, titelblok);
      kaart.append(kop);
      huidig.rijen.get(agent.naam).forEach((inhoud, index) => {
        const veld = document.createElement('div');
        veld.className = 'kaart-veld';
        if (huidig.velden.length > 1) {
          const label = document.createElement('h4');
          label.textContent = huidig.velden[index];
          veld.append(label);
        }
        const tekst = document.createElement('p');
        // Alleen vertrouwde, lokale HTML uit de vergelijking wordt hier overgenomen.
        tekst.innerHTML = inhoud;
        veld.append(tekst);
        kaart.append(veld);
      });
      const bronknop = maakKnop('Bekijk documentatie ↗', 'kaart-bron', () => {
        const verwijzingen = [...kaart.querySelectorAll('a[href^="#bron-"]')].map(link => link.hash.slice(1));
        const directeLinks = [...kaart.querySelectorAll('a[href^="http"]')];
        // Het profiel heeft geen inline bronnummer; toon de product- en workflowbronnen.
        const index = agents.indexOf(agent);
        const ids = verwijzingen.length ? verwijzingen : [`bron-${index + 1}`, `bron-${index + 7}`];
        openBronnen(ids, directeLinks, agent.naam);
      });
      kaart.append(bronknop);
      rooster.append(kaart);
    }

    const reeks = volgorde();
    const index = reeks.indexOf(huidig);
    vind('#vorige').disabled = index <= 0;
    vind('#volgende').disabled = index < 0 || index >= reeks.length - 1;
    vind('#voortgang').textContent = index < 0 ? 'Geen passende onderwerpen' : `${String(index + 1).padStart(2, '0')} / ${String(reeks.length).padStart(2, '0')}`;
    const stappenbalk = vind('#route-stappen');
    stappenbalk.hidden = actieveRoute === 0;
    stappenbalk.replaceChildren();
    if (actieveRoute !== 0) {
      reeks.forEach((onderwerp, stap) => {
        const knop = maakKnop(`${stap + 1}. ${onderwerp.kort}`, 'route-stap', () => {
          kiesOnderwerp(onderwerp);
          vind('#route-stappen').children[stap].focus({ preventScroll: true });
        });
        if (onderwerp === huidig) knop.setAttribute('aria-current', 'step');
        stappenbalk.append(knop);
      });
    }
    vind('#melding').textContent = `${huidig.kort}. ${gekozenAgents.size} agents in de vergelijking.`;
  }

  function openBronnen(ids = [], directeLinks = [], naam = '') {
    const inhoud = vind('#bronnen-inhoud');
    inhoud.replaceChildren();
    vind('#bronnen-titel').textContent = naam ? `Documentatie · ${naam}` : (ids.length ? 'Geselecteerde bronnen' : 'Alle bronnen');
    if (directeLinks.length) {
      const links = document.createElement('div');
      links.className = 'directe-bronnen';
      directeLinks.forEach(link => links.append(link.cloneNode(true)));
      inhoud.append(links);
    }
    const lijst = document.createElement('ul');
    lijst.className = 'bronnen-lijst';
    const bronnen = ids.length ? [...new Set(ids)].map(id => broninhoud.querySelector(`#${id}`)).filter(Boolean) : [...broninhoud.querySelectorAll('.bronnen-lijst li')];
    bronnen.forEach(bron => {
      const kopie = bron.cloneNode(true);
      kopie.removeAttribute('id');
      lijst.append(kopie);
    });
    inhoud.append(lijst);
    vind('#bronnen-dialoog').showModal();
  }

  vind('#zoekterm').addEventListener('input', gebeurtenis => {
    actieveRoute = 0;
    const woorden = normaliseer(gebeurtenis.target.value).trim().split(/\s+/).filter(Boolean);
    passendeOnderwerpen = onderwerpen.filter(onderwerp => woorden.every(woord => onderwerp.zoektekst.includes(woord)));
    vind('#zoek-status').textContent = woorden.length ? `${passendeOnderwerpen.length} onderwerpen gevonden` : '';
    tekenRoutes();
    if (passendeOnderwerpen.length && !passendeOnderwerpen.includes(huidig)) kiesOnderwerp(passendeOnderwerpen[0]);
    else { tekenNavigatie(); tekenOnderwerp(); }
    vind('.onderwerp-paneel').hidden = passendeOnderwerpen.length === 0;
  });
  // Een route herstelt de volledige verkenner, ook na een zoekopdracht zonder resultaat.
  vind('#routes').addEventListener('click', () => { vind('.onderwerp-paneel').hidden = false; });
  vind('#vorige').addEventListener('click', () => { const reeks = volgorde(); kiesOnderwerp(reeks[reeks.indexOf(huidig) - 1]); });
  vind('#volgende').addEventListener('click', () => { const reeks = volgorde(); kiesOnderwerp(reeks[reeks.indexOf(huidig) + 1]); });
  function toonAlleAgents() {
    agents.forEach(agent => gekozenAgents.add(agent.naam));
    tekenAgents();
    tekenOnderwerp();
  }
  vind('#alle-agents').addEventListener('click', toonAlleAgents);
  vind('#herstel-agents').addEventListener('click', () => {
    toonAlleAgents();
    vind('.vergelijk-ruimte').scrollTop = 0;
    vind('#agentkeuze button').focus({ preventScroll: true });
  });
  vind('#alle-bronnen').addEventListener('click', () => openBronnen());
  vind('#agentkaarten').addEventListener('click', gebeurtenis => {
    const link = gebeurtenis.target.closest('a[href^="#bron-"]');
    if (!link) return;
    gebeurtenis.preventDefault();
    openBronnen([link.hash.slice(1)]);
  });
  vind('#sluit-bronnen').addEventListener('click', () => vind('#bronnen-dialoog').close());
  vind('#thema').addEventListener('click', () => {
    const donker = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = donker ? 'dark' : 'light';
    vind('#thema').setAttribute('aria-label', `${donker ? 'Lichte' : 'Donkere'} weergave inschakelen`);
  });
  window.addEventListener('hashchange', () => {
    const onderwerp = onderwerpen.find(item => `#${item.id}` === location.hash);
    if (!onderwerp || onderwerp === huidig) return;
    actieveRoute = 0;
    vind('#zoekterm').value = '';
    passendeOnderwerpen = onderwerpen;
    vind('#zoek-status').textContent = '';
    vind('.onderwerp-paneel').hidden = false;
    tekenRoutes();
    kiesOnderwerp(onderwerp, false);
  });

  tekenAgents();
  tekenRoutes();
  tekenNavigatie();
  tekenOnderwerp();
  broninhoud.hidden = true;
  vind('#verkenner').hidden = false;
  vind('#thema').hidden = false;
})();
