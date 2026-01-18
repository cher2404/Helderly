# Vercel + Supabase Integration Setup

## ✅ Auto-sync Environment Variables

Met de Vercel integratie in Supabase worden je environment variables automatisch gesynchroniseerd!

### Wat je ziet in Supabase:

De volgende variabelen zijn beschikbaar:
- `POSTGRES_URL` ❌ (niet nodig voor Next.js)
- `POSTGRES_PRISMA_URL` ❌ (niet nodig voor Next.js)
- `POSTGRES_URL_NON_POOLING` ❌ (niet nodig voor Next.js)
- `POSTGRES_USER` ❌ (niet nodig voor Next.js)
- `POSTGRES_HOST` ❌ (niet nodig voor Next.js)
- `POSTGRES_PASSWORD` ❌ (niet nodig voor Next.js)
- `POSTGRES_DATABASE` ❌ (niet nodig voor Next.js)
- `SUPABASE_SERVICE_ROLE_KEY` ❌ (alleen voor server-side, niet nodig nu)
- `SUPABASE_ANON_KEY` ❌ (gebruik in plaats daarvan `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `SUPABASE_URL` ❌ (gebruik in plaats daarvan `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_JWT_SECRET` ❌ (niet nodig voor client-side)
- ✅ **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** (nodig!)
- ✅ **`NEXT_PUBLIC_SUPABASE_URL`** (nodig!)

### Setup Stappen:

1. **In Supabase Dashboard**:
   - Ga naar Settings > Vercel Integration
   - Je project "Helderly" is al verbonden ✅

2. **Selecteer target environments**:
   - ✅ **Production**: AAN (voor live website)
   - ⚪ **Preview**: Optioneel AAN (voor preview deployments)
   - ⚪ **Development**: Meestal UIT (lokale `.env.local` heeft prioriteit)

3. **Check prefix**:
   - Prefix: `NEXT_PUBLIC_` ✅ (correct!)

4. **Klik "Save"**
   - Supabase synchroniseert automatisch de juiste variabelen naar Vercel

### Verificatie:

1. **In Vercel Dashboard**:
   - Ga naar je Helderly project
   - Settings > Environment Variables
   - Je zou moeten zien:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://vnovojphzvwjuskbfjpg.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...`

2. **Redeploy**:
   - Na sync, redeploy je app in Vercel
   - Ga naar Deployments tab
   - Klik op 3 dots → "Redeploy"

### ✅ Klaar!

Nu worden je Supabase credentials automatisch gesynchroniseerd van Supabase naar Vercel. 
Geen handmatig kopiëren meer nodig!

## 🔒 Veiligheid

- ✅ `NEXT_PUBLIC_*` variabelen zijn veilig voor client-side (publiekelijk)
- ❌ `SUPABASE_SERVICE_ROLE_KEY` is **NOOIT** nodig voor client-side Next.js app
- ✅ Auto-sync voorkomt typfouten en sync problemen
