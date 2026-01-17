# Icon Generator Instructies

De app heeft iconen nodig voor PWA functionaliteit. Maak de volgende iconen:

1. **icon-192.png** - 192x192 pixels
2. **icon-512.png** - 512x512 pixels

## Design richtlijnen:
- Gebruik het Helderly logo/icon
- Achtergrond: Paarse gradient (#8C46E0 naar #7B3FD0) of wit met paars accent
- Voor maskable icons: Zorg dat belangrijk content binnen 80% van de canvas valt
- Geen tekst, alleen icon/logo

## Quick fix voor development:
Je kunt tijdelijk een SVG converteren naar PNG, of een placeholder gebruiken:
- Maak een 192x192 paarse vierkant met wit Helderly logo
- Maak een 512x512 versie van hetzelfde

## Tools:
- Online: https://realfavicongenerator.net/
- Figma: Export als PNG
- ImageMagick: `convert logo.svg -resize 192x192 icon-192.png`
