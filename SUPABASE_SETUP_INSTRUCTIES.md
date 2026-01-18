# Supabase Database Setup - Stap voor Stap

## ✅ Wat je nodig hebt:
- ✅ Supabase project aangemaakt
- ✅ Environment variables ingesteld (`.env.local`)
- ✅ Vercel integratie ingesteld (optioneel)

## 📋 Stap 1: SQL Schema Uitvoeren

1. **Ga naar Supabase Dashboard**
   - Log in op [supabase.com](https://supabase.com)
   - Selecteer je Helderly project

2. **Open SQL Editor**
   - Klik op "SQL Editor" in het linkermenu
   - Klik op "New Query"

3. **Voer het schema uit**
   - Open het bestand `supabase-schema.sql` in je project
   - Kopieer de hele SQL code
   - Plak het in de SQL Editor
   - Klik op "Run" (of druk F5)

4. **Verifieer dat het gelukt is**
   - Je zou moeten zien: "Success. No rows returned"
   - Ga naar "Table Editor" in het linkermenu
   - Je zou de volgende tabellen moeten zien:
     - ✅ `profiles`
     - ✅ `folders`
     - ✅ `tasks`
     - ✅ `teams`
     - ✅ `team_members`
     - ✅ `notifications`

## 📋 Stap 2: TypeScript Types Genereren (Aanbevolen)

Voor type-safe code in Next.js:

1. **In Supabase Dashboard**
   - Ga naar **Settings** > **API**
   - Scroll naar beneden naar "Project API keys"
   - Klik op "Generate TypeScript types" knop (of zoek naar "TypeScript types")

2. **Kopieer de types**
   - Er wordt een TypeScript bestand gegenereerd
   - Kopieer de inhoud

3. **Maak types bestand in je project**
   - Maak een nieuw bestand: `lib/database.types.ts`
   - Plak de gegenereerde types erin

4. **Update `lib/supabase.ts`**
   - Importeer de types: `import type { Database } from './database.types'`
   - Gebruik de types in je Supabase client

## 📋 Stap 3: Test de Connectie

1. **Herstart je development server**
   ```bash
   npm run dev
   ```

2. **Test of Supabase werkt**
   - Maak een test pagina of gebruik de bestaande app
   - Probeer een taak toe te voegen (via de UI)
   - Check in Supabase Table Editor of de taak is toegevoegd

## 🔍 Troubleshooting

### Probleem: "Missing Supabase environment variables"
**Oplossing**: Controleer of `.env.local` bestaat en de juiste waarden bevat

### Probleem: "relation does not exist"
**Oplossing**: Voer het SQL schema opnieuw uit in SQL Editor

### Probleem: "permission denied"
**Oplossing**: Check of Row Level Security policies correct zijn ingesteld
- Ga naar Table Editor
- Klik op een tabel
- Ga naar "Policies" tab
- Check of de policies bestaan

### Probleem: Types niet beschikbaar
**Oplossing**: Genereer TypeScript types opnieuw via Settings > API

## 📚 Wat maakt het schema aan?

### Tabellen:
- **profiles**: Gebruikersprofielen (plan, naam, email)
- **folders**: Mappen voor taken (persoonlijk of gedeeld)
- **tasks**: Taken met alle details (status, prioriteit, herhaling, etc.)
- **teams**: Teams voor samenwerking
- **team_members**: Leden van teams met rollen
- **notifications**: Notificaties voor gebruikers

### Beveiliging:
- ✅ Row Level Security (RLS) ingeschakeld op alle tabellen
- ✅ Users kunnen alleen hun eigen data zien
- ✅ Gedeelde mappen zijn toegankelijk voor team leden
- ✅ Team owners hebben admin rechten

### Performance:
- ✅ Indexes op belangrijke velden (user_id, folder_id, due_date, etc.)
- ✅ Automatic updated_at triggers

## ✅ Volgende Stappen

Na het aanmaken van het schema:
1. ✅ Test de tabellen in Supabase Table Editor
2. ✅ Genereer TypeScript types
3. ✅ Test de connectie vanuit je app
4. ✅ Begin met het migreren van localStorage naar Supabase (optioneel later)

## 💡 Tip

Voor nu werkt je app nog met localStorage (Zustand persist). Later kun je de stores updaten om Supabase te gebruiken in plaats van localStorage. Dat is een mooie volgende stap!
