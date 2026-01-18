# Supabase Verificatie Checklist

## ✅ Verifieer dat alle tabellen bestaan

Ga naar Supabase Dashboard > Table Editor en check of je deze tabellen ziet:

- [x] `profiles` - Gebruikersprofielen
- [x] `folders` - Mappen voor taken
- [x] `tasks` - Taken
- [x] `teams` - Teams voor samenwerking
- [x] `team_members` - Team leden
- [x] `notifications` - Notificaties

## ✅ Verifieer Row Level Security (RLS)

Ga naar elke tabel en check de "Policies" tab:

1. **profiles**: 
   - ✅ "Users can view own profile"
   - ✅ "Users can insert own profile"
   - ✅ "Users can update own profile"

2. **tasks**:
   - ✅ "Users can view own tasks"
   - ✅ "Users can insert own tasks"
   - ✅ "Users can update own tasks"
   - ✅ "Users can delete own tasks"

3. **folders**:
   - ✅ "Users can view own folders"
   - ✅ "Users can insert own folders"
   - ✅ "Users can update own folders"
   - ✅ "Users can delete own folders"

4. **teams**:
   - ✅ "Users can view teams"
   - ✅ "Users can insert teams"
   - ✅ "Users can update teams"
   - ✅ "Users can delete teams"

5. **team_members**:
   - ✅ "Users can view team members"
   - ✅ "Users can add team members"
   - ✅ "Users can update team members"
   - ✅ "Users can remove team members"

6. **notifications**:
   - ✅ "Users can view own notifications"
   - ✅ "System can insert notifications"
   - ✅ "Users can update own notifications"
   - ✅ "Users can delete own notifications"

## ✅ Test de connectie (optioneel)

In Supabase Dashboard > SQL Editor, voer deze test query uit:

```sql
-- Test of je data kunt lezen (moet leeg zijn, maar geen errors geven)
SELECT * FROM tasks LIMIT 1;
SELECT * FROM folders LIMIT 1;
SELECT * FROM profiles LIMIT 1;
```

Je zou moeten zien: "(0 rows)" zonder errors.

## ✅ TypeScript Types Genereren (Aanbevolen)

1. Ga naar **Settings** > **API**
2. Scroll naar beneden
3. Klik op "Generate TypeScript types" of zoek naar "TypeScript"
4. Kopieer de gegenereerde types

## 🎉 Klaar!

Je database is nu volledig ingesteld en klaar voor gebruik!
