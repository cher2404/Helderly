# Vercel Environment Variables

## 🔐 Voeg Supabase credentials toe aan Vercel

Voor productie deploy op Vercel, voeg deze environment variables toe:

### Stappen:

1. **Ga naar je Vercel project**
   - Log in op [vercel.com](https://vercel.com)
   - Selecteer je Helderly project

2. **Ga naar Settings > Environment Variables**

3. **Voeg deze variabelen toe**:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://vnovojphzvwjuskbfjpg.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZub3ZvanBoenZ3anVza2JmanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NzQ1NjEsImV4cCI6MjA4NDI1MDU2MX0.jTfvLlIfkEjCCk1naSxUYiqfHqHzkyw44wjxxQ383B8`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

4. **Klik "Save"**

5. **Redeploy je app**
   - Na het toevoegen van environment variables, redeploy je app
   - Ga naar Deployments tab
   - Klik op de 3 dots naast je laatste deployment
   - Kies "Redeploy"

## ✅ Verificatie

Na redeploy zou je app moeten werken met Supabase!

## 🚨 Veiligheid

- ✅ `.env.local` staat al in `.gitignore` (wordt niet gecommit)
- ✅ Deze credentials zijn publiekelijk veilig (anon key is bedoeld voor client-side)
- ⚠️ Gebruik NOOIT service_role key in client-side code
