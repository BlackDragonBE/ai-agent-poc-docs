# Provincie Antwerpen — merkassets voor web en presentaties

## Begin hier

Lees dit bestand vóór je een webpagina of presentatie in deze huisstijl maakt. Kies assets via [assets.json](assets.json); bekijk [preview.png](preview.png) voor het visuele overzicht. Het manifest gebruikt paden relatief aan deze map.

Bron: [Stijlgids 2025](../ProvincieAntwerpen_Guidelines.pdf). De PDF blijft leidend. De bestanden hier zijn rechtstreeks uit de vectorillustraties van de PDF geëxtraheerd, niet uit officiële masterbestanden. De extractie verleent geen nieuwe gebruiksrechten.

## Beschikbare assets

| Map | Inhoud | Bronpagina |
|---|---|---|
| `assets/logos/` | 4 Nederlandse varianten: liggend/staand, kleur/wit; 3 liggende kleurenlogo's in Engels, Frans en Duits | 5–7 |
| `assets/cutouts/` | 8 voorgedefinieerde uitsnedes, genummerd links-rechts en boven-onder | 40 |
| `assets/cutlines/` | 6 voorgedefinieerde snijlijnvlakken, met hun originele witte achtergrond | 50 |
| `assets/patterns/` | 3 tekstvrije patroonstalen, geëxtraheerd uit de kleine vierkante voorbeelden | 57 |
| `references/` | Afbeeldingen van bronpagina's voor maatvoering, typografie, kleuren en layoutregels | Zie manifest |

Elke asset heeft een zelfstandige SVG en een PNG met een langste zijde van circa 1600 pixels. Gebruik SVG op het web; gebruik SVG of PNG in presentaties naargelang de ondersteuning. De SVG-logo's bevatten lettercontouren, geen tekst: er is geen lettertype nodig om ze weer te geven.

De bestandsnamen van de patronen beschrijven de kleurindruk van de bronstalen. Ze zijn geen toestemming om kleuren te vervangen of de algemene kleurensetregels te negeren. Snijlijnvoorbeelden in secundaire kleuren zijn uitsluitend voor marketingcommunicatie.

## Verplichte merkregels

### Logo

- Gebruik bij voorkeur het liggende logo; houd symbool en woordmerk samen. Niet vervormen, hertekenen of herkleuren.
- Kleurenlogo op wit of lichte fotografie; wit logo op kleurvlakken of donkere fotografie. Gebruik waar nodig een rechthoekig wit vlak voor leesbaarheid.
- Voorzie rondom vrije ruimte van minstens een halve breedte van de driehoek uit het logo. De exports zijn strak uitgesneden: deze beschermzone moet de layout zelf toevoegen. Zie [p. 12](references/page-12.png).
- De minimale schermmaat van 20 px slaat in het diagram op de hoogte van het driehoeksymbool, niet op de volledige logobreedte. Controleer de uiteindelijke weergave aan [p. 13](references/page-13.png).
- Eigen locatielogo's zijn niet toegestaan; die worden door de communicatiedienst uitgewerkt.

### Kleuren

- Eén kleurenset per toepassing. Officiële communicatie en presentaties: primaire rode, roze of oranje set. Secundaire sets alleen voor marketingcommunicatie.
- Maximaal één extra accentkleur uit een andere set; snijlijngrafiek zelf gebruikt uitsluitend kleuren uit één set.
- Geen afgeleide tinten, transparantie of effecten op kleurvlakken. Gebruik voldoende tekstcontrast; een gedeelde kleurenset garandeert geen toegankelijke combinatie.
- Grijs alleen functioneel, op wit of zwart; niet voor creatieve layouts.
- Exacte bronwaarden: [primair, p. 30](references/page-30.png), [secundair, p. 31](references/page-31.png), [secundair en grijs, p. 32](references/page-32.png). De paarse set bevat op p. 32 een tegenstrijdigheid tussen de hex- en RGB-notatie van paarsblauw; vraag hiervoor de goedgekeurde waarde aan de communicatiedienst.

### Typografie

- Titels: Museo of Museo Sans. Tussentitels: Museo of Museo Sans 700 of 900.
- Lopende tekst: bij voorkeur Museo Sans; de gids illustreert gewicht 300. Voor omvangrijke leestekst mag Tisa Pro Regular, nooit voor titels.
- Geen Museo Slab of Museo Sans Rounded. Geen lange doorlopende tekst in Museo. Zie [p. 20](references/page-20.png).
- In Office mag Aptos wanneer Museo niet mogelijk is. Dit is geen algemene goedkeuring van een vervangend webfont.
- De aangeleverde map `C:/Users/PAUEVDK/Downloads/MuseoSansFamily` bevat Museo Sans OTF in 100, 300, 500, 700 en 900, telkens normaal en cursief. De bestandslijst bevat geen licentie. Deze fonts zijn daarom niet gekopieerd of als webfont opgenomen. Controleer rechten voor webgebruik, distributie en presentatie-embedding vóór opname; vraag zo nodig gelicentieerde WOFF2-bestanden.

### Layout

- Een rechtlijnig grid is toegestaan voor functionele inhoud. Creatieve merkblokken mogen daarbinnen staan. Zie [p. 62](references/page-62.png).
- Kies één creatieve layoutstijl per ontwerp: uitsnedes (voorkeur), snijlijnen óf voorgedefinieerde patroonachtergronden. Niet onderling mengen.
- Uitsnedes: maximaal drie snijlijnen; bescherm het binnenvlak met een marge van 20% van de kortste zijde. Uitgesneden hoeken minimaal 60°. Bij kruisende lijnen mag de lijn zelf door de veilige zone lopen, maar het verwijderde hoekvlak niet. Zie [p. 42](references/page-42.png) en [p. 43](references/page-43.png).
- Snijlijnen: maximaal twee lijnen; maximaal één horizontale óf verticale lijn. Combineer die niet tot een hoek van 90°. Zie [p. 52](references/page-52.png).
- Patronen: behoud de voorgedefinieerde kleuren. Niet combineren met fotografie, secundaire kleurensets of andere creatieve layouttypes. Zie [p. 58](references/page-58.png).
- Rek de grafische assets niet niet-proportioneel uit. Een PNG is geen fotografisch masker; gebruik voor uitsnedes de SVG-geometrie en toets de toepassing aan de veilige zone.

## Aanbevolen startkeuzes — geen extra huisstijlverplichtingen

- Voor een officiële pagina of presentatie: primaire rode set, Museo Sans en een functioneel grid met gerichte uitsnedes.
- [brand.css](brand.css) biedt expliciete kleurvariabelen voor de drie primaire sets en semantische variabelen voor deze rode startkeuze. Het bestand past geen globale stijlen toe en laadt geen fonts. Gebruik maximaal één set in het ontwerp; alleen de aanwezigheid van een variabele geeft geen toestemming om sets te mengen.
- Toon inhoud en betekenisvolle acties als echte tekst, niet als afbeelding. Geef het logo een passende alternatieve tekst; decoratieve grafiek krijgt een lege alternatieve tekst.
- De gids specificeert geen animatierichtlijnen. Kies terughoudende overgangen en respecteer verminderde beweging. Dit is aanvullend digitaal advies.

## Controle vóór oplevering

- Juiste logotaal, variant, beschermzone en minimale symboolhoogte.
- Eén kleurenset en één creatieve layoutstijl; uitzonderingen correct toegepast.
- Fontrechten gecontroleerd; bedoelde fonts daadwerkelijk geladen of beschikbaar.
- Webpagina of presentatie echt bekijken: ook mobiel of geprojecteerd waar relevant.
- Aanvullend voor web: contrast, toetsenbordbediening en verminderde beweging controleren.

## Herkomst en verificatie

Extractie uitgevoerd op 2026-10-29. De vectorpaden, kleuren, transformaties en relevante clipping zijn uit de PDF-SVG-export overgenomen; achtergronden en toelichtingen buiten de gekozen asset zijn weggelaten. Bij de snijlijnvlakken is het witte vlak bewust behouden. De PNG's zijn vanuit de opgeslagen SVG's gerenderd; de overzichtsafbeelding gebruikt deze PNG's.

Alle 24 assets zijn visueel bekeken in het overzicht. SVG-structuur en PNG-weergave zijn gecontroleerd; een webpagina of presentatie met deze kit is nog niet gebouwd of getest. Deze kit bevat geen fotografie uit voorbeeldontwerpen, geen geïnstalleerde fonts en geen originele Office-sjablonen.

Officiële masterbestanden, rechten of twijfelgevallen: communicatie@provincieantwerpen.be.
