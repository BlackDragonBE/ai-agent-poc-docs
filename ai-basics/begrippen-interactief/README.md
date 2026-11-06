# AI-agents, stap voor stap

Een interactieve versie van [`BEGRIPPEN.md`](../BEGRIPPEN.md): een kleine website die de begrippen rond AI-agents uitlegt met schema's die je zelf kunt uitproberen.

## Openen

Dubbelklik op `index.html`. De pagina opent in je browser. Een webserver of installatie is niet nodig.

Twee dingen komen van internet:

| Wat | Waarvoor | Zonder internet |
|---|---|---|
| Google Fonts (Mulish, IBM Plex Mono) | lettertypes | een gewoon systeemlettertype |
| Lucide | de iconen | geen iconen |

De tokenizer voor het Token-schema staat in `js/lib/` en werkt dus ook zonder internet.

## Hoe het in elkaar zit

```text
index.html              de pagina zelf: laadt alle CSS- en JS-bestanden
css/
  basis.css             kleuren, lettertypes, knoppen, meldingen, animaties
  pagina.css            intro, leerpad bovenaan, en de gids per deel
  visuals.css           de opmaak van de schema's, één sectie per bestand in js/visuals/
js/
  hulp.js               kleine hulpfuncties en het register VISUALS
  inhoud.js             ALLE TEKST: intro, delen, begrippen, uitleg
  visuals/
    basis.js            schema's van deel 1: De basis
    agent.js            schema's van deel 2: Van chat naar agent
    veiligheid.js       schema's van deel 3: Veiligheid
    uitbreiden.js       schema's van deel 4: De agent sturen en uitbreiden
    sessies.js          schema's van deel 5: Lange sessies
  app.js                bouwt de pagina op uit inhoud.js en regelt de navigatie
  lib/
    gpt-tokenizer-o200k_base.js   tokenizer van gpt-tokenizer 3.4.0 (niet zelf aanpassen)
    gpt-tokenizer-LICENSE.txt     de MIT-licentie die bij de tokenizer hoort
```

De volgorde waarin `index.html` de scripts laadt, is belangrijk: eerst `hulp.js`, dan `inhoud.js`, dan de schema's, en als laatste `app.js`.

Er is geen build-stap: wat je in een bestand verandert, zie je meteen nadat je de pagina vernieuwt (F5).

## Veelvoorkomende aanpassingen

### Een tekst aanpassen

Alle tekst staat in `js/inhoud.js`. Elk begrip ziet er zo uit:

```js
{ id: 'tool', icoon: 'wrench', naam: 'Tool', visual: 'tool',
  definitie: 'Een hulpmiddel dat de AI kan gebruiken ...',
  voorbeelden: [] },
```

- `definitie` is de uitleg onder de titel. HTML zoals `<strong>` en `<code>` mag.
- `voorbeelden` is een lijst met korte voorbeelden. Laat de lijst leeg (`[]`) als het schema de voorbeelden al toont.
- `callout` (optioneel) is een tip, notitie of waarschuwing: `{ soort: 'tip', titel: '...', tekst: '...' }`.
- `icoon` is de naam van een icoon op [lucide.dev/icons](https://lucide.dev/icons).

### De volgorde veranderen

Verplaats een deel of een begrip binnen `js/inhoud.js`. Het leerpad en de nummers passen zich vanzelf aan.

### Een nieuw schema maken

1. Kies het bestand in `js/visuals/` van het deel waar het schema bij hoort.
2. Voeg een nieuwe visual toe:

   ```js
   VISUALS.mijnschema = {
     label: 'Probeer het',              // tekst boven het schema
     icoon: 'mouse-pointer-click',      // icoon naast die tekst
     maak(el, begrip) {
       el.innerHTML = `<p>Hallo!</p>`;  // vul het vak met je schema
     },
   };
   ```

3. Zet `visual: 'mijnschema'` bij het begrip in `js/inhoud.js`.
4. Zet de opmaak in `css/visuals.css`, in de sectie van hetzelfde deel.

Gebruik je iconen in je schema, roep dan na het invullen `tekenIconen()` aan.

## Afspraken in de code

- Namen en commentaar zijn in het Nederlands; productnamen, commando's en bestandsnamen blijven in het Engels.
- Elke visual staat in een eigen sectie met een kopje in commentaar, zodat je ze snel terugvindt.
- Kleuren staan als variabelen bovenaan `css/basis.css` (bijvoorbeeld `--accent`), met een aparte set voor de donkere modus.
- Wie in het systeem "minder beweging" kiest, krijgt geen animaties. Laat een animatie daarom altijd vanuit een verborgen toestand starten, zodat het eindresultaat ook zonder animatie zichtbaar is.
