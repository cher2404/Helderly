# Supabase Setup Instructies

## 📋 Waar vind je je Supabase credentials?

1. **Log in op Supabase Dashboard** met je wachtwoord
   - Ga naar [supabase.com](https://supabase.com)
   - Log in met je account

2. **Ga naar je project**
   - Selecteer je Helderly project (of maak een nieuw project aan)

3. **Haal je credentials op**:
   - Ga naar **Settings** > **API**
   - Je ziet daar:
     - **Project URL**: `https://xxxxx.supabase.co` → Dit is je `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public key**: Een lange string → Dit is je `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key**: Een andere lange string (OPPASSEN: gebruik deze NOOIT in client-side code!) → Dit is je `SUPABASE_SERVICE_ROLE_KEY` (optioneel)

## 🔐 .env.local bestand aanmaken

1. Kopieer `.env.local.example` naar `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Vul de waarden in:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://jouw-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier

   # Optioneel: Voor server-side operations (gebruik NOOIT in client-side code!)
   # SUPABASE_SERVICE_ROLE_KEY=jouw-service-role-key
   ```

3. **BELANGRIJK**: Het `.env.local` bestand staat al in `.gitignore`, dus het wordt NIET gecommit naar GitHub.

## ✅ Testen

Na het instellen van `.env.local`:
1. Herstart je development server:
   ```bash
   npm run dev
   ```

2. De Supabase connectie zou nu moeten werken!

## 🚨 Veiligheid

- ❌ Commit NOOIT `.env.local` naar GitHub
- ❌ Gebruik NOOIT `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- ✅ Gebruik alleen `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` voor client-side
- ✅ Service role key alleen voor API routes (server-side)
