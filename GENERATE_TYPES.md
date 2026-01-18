# TypeScript Types Genereren - Alternatieve Methoden

## Methode 1: Via Supabase CLI (Aanbevolen)

### Stap 1: Installeer Supabase CLI

```bash
npm install -g supabase
```

Of met PowerShell:
```powershell
npm install -g supabase
```

### Stap 2: Login met Supabase

```bash
supabase login
```

Dit opent je browser om in te loggen.

### Stap 3: Genereer Types

```bash
supabase gen types typescript --project-id vnovojphzvwjuskbfjpg > lib/database.types.ts
```

**OF** via de URL:

```bash
supabase gen types typescript --project-id vnovojphzvwjuskbfjpg --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.vnovojphzvwjuskbfjpg.supabase.co:5432/postgres" > lib/database.types.ts
```

---

## Methode 2: Via Supabase Dashboard (Manueel)

### Waar vind je het?

1. **Ga naar je Supabase Dashboard**
   - [supabase.com](https://supabase.com/dashboard)
   - Selecteer je project

2. **Ga naar API Reference**
   - Klik op **"API"** in het linkermenu
   - Scroll naar beneden naar **"API Reference"** sectie
   - Of ga direct naar: `https://supabase.com/dashboard/project/vnovojphzvwjuskbfjpg/api`

3. **TypeScript Types**
   - Soms staat er een sectie met "Generate types" of "TypeScript"
   - Of kijk onder "Code snippets"

---

## Methode 3: Online Tool (Snelste)

Gebruik een online tool zoals [supabase-ts-gen](https://github.com/supabase-community/supabase-ts-gen):

1. Ga naar je Supabase Dashboard
2. Settings > API
3. Kopieer je **Project URL** en **anon key**
4. Gebruik een online generator (zoek naar "supabase typescript types generator")

---

## Methode 4: Handmatig (Als laatste redmiddel)

Als geen van bovenstaande werkt, kunnen we de types handmatig maken op basis van het schema.

---

## Welke methode wil je proberen?

Laat me weten welke methode je wilt gebruiken, dan help ik je stap voor stap!
