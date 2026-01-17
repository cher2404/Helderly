# 🚀 Quick Start: Vercel + Supabase

## Supabase Setup (5 minuten)

### 1. Maak Supabase project
1. Ga naar [supabase.com](https://supabase.com) → Sign up
2. Klik "New Project"
3. Vul in: naam, wachtwoord (bewaar deze!)
4. Wacht 2 minuten tot project klaar is

### 2. Haal API keys op
1. Ga naar Settings → API
2. Kopieer:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGci...`

### 3. Maak database schema
1. Ga naar SQL Editor in Supabase
2. Open `DEPLOYMENT.md` → kopieer alle SQL code
3. Plak in SQL Editor → Run

### 4. Installeer Supabase client
```bash
cd helderly
npm install
```

### 5. Maak `.env.local` bestand
```bash
# Kopieer het voorbeeld bestand
cp .env.local.example .env.local
```

Vul dan in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier
```

---

## Vercel Deployment (3 minuten)

### Optie 1: Via GitHub (aanbevolen)
```bash
# 1. Maak GitHub repo en push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/jouw-username/helderly.git
git push -u origin main

# 2. Ga naar vercel.com → Import Project → Kies je repo
# 3. Vercel detecteert Next.js automatisch
# 4. Voeg Environment Variables toe (Settings → Environment Variables):
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
# 5. Klik Deploy
```

### Optie 2: Via Vercel CLI
```bash
# 1. Installeer Vercel CLI
npm i -g vercel

# 2. Deploy
cd helderly
vercel

# 3. Volg de prompts
# 4. Voeg environment variables toe via Vercel dashboard
```

---

## ✅ Test je deployment

1. **Local test**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

2. **Vercel test**:
   - Ga naar je Vercel project URL
   - Test login/signup
   - Test taken toevoegen (data komt nu uit Supabase!)

---

## 🔧 Troubleshooting

**"Missing Supabase environment variables"**
- Check of `.env.local` bestaat en correct is ingevuld
- Restart dev server: `npm run dev`

**"Cannot connect to Supabase"**
- Check of Project URL correct is (geen trailing slash)
- Check of anon key correct is

**Database errors**
- Check of SQL schema is uitgevoerd (SQL Editor → History)
- Check RLS policies zijn aan (Settings → API → RLS enabled)

**Vercel build errors**
- Check of environment variables zijn toegevoegd
- Check build logs in Vercel dashboard

---

## 📚 Volgende stappen

Na deze setup:
1. Test auth flow (login/signup)
2. Migreer lokale data naar Supabase (optioneel)
3. Test multi-device sync
4. Setup email templates in Supabase (Auth → Email Templates)

**Vragen?** Check `DEPLOYMENT.md` voor uitgebreide uitleg.
