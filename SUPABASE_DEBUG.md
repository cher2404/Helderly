# Supabase Connectie Debugging

## Probleem: Account aangemaakt maar geen gebruikers te zien, geen taken/mappen kunnen aanmaken

### Stap 1: Controleren waar gebruikers staan
**BELANGRIJK:** In Supabase staan gebruikers in **`auth.users`**, niet in de Table Editor!

- Ga naar: **Supabase Dashboard → Authentication → Users**
- Hier zie je alle aangemaakte accounts
- De `profiles` tabel is een aparte tabel in **Table Editor → profiles**

### Stap 2: Controleren of profiel bestaat
1. Ga naar **Table Editor → profiles**
2. Check of er een profiel is voor jouw account
3. Als er geen profiel is, maak het handmatig aan (zie onder)

### Stap 3: Controleren Environment Variables in Vercel
1. Ga naar Vercel Dashboard → Je project → Settings → Environment Variables
2. Check of deze variabelen zijn ingesteld:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Als ze ontbreken, voeg ze toe en **redeploy**

### Stap 4: Test de connectie
Open browser console (F12) en voer uit:

```javascript
// Check Supabase configuratie
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

// Check sessie
const { data: { session } } = await window.supabase.auth.getSession();
console.log('Current session:', session);
console.log('Current user:', session?.user);
```

### Stap 5: Controleer RLS Policies
1. Ga naar **Supabase Dashboard → Authentication → Policies**
2. Check of RLS is enabled voor:
   - `profiles`
   - `tasks`
   - `folders`
3. Check of de policies correct zijn (zie supabase-schema.sql)

### Stap 6: Maak profiel aan voor bestaand account
1. Ga naar **Authentication → Users**
2. Klik op je account → kopieer **User UID**
3. Ga naar **SQL Editor** en voer uit:

```sql
INSERT INTO public.profiles (id, email, full_name, plan)
VALUES (
  'JE-USER-UID-HIER',  -- Plak je User UID
  'jouw-email@example.com',  -- Je email
  'Jouw Naam',  -- Je naam
  'free'
)
ON CONFLICT (id) DO NOTHING;
```

### Stap 7: Test na fixes
1. Log uit en log weer in
2. Probeer een taak aan te maken
3. Check browser console voor errors
4. Check Network tab voor failed requests
