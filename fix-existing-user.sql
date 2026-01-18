-- Script om een profiel aan te maken voor een bestaand account
-- Vervang 'jouw-user-id-hier' met het ID van je gebruiker uit auth.users tabel

-- Eerst: Vind je user ID
-- Ga naar Supabase Dashboard > Authentication > Users
-- Klik op je account en kopieer het User UID

-- Dan voer dit uit (vervang de waarden):
INSERT INTO public.profiles (id, email, full_name, plan)
VALUES (
  'jouw-user-id-hier',  -- Vervang met je user ID
  'jouw-email@example.com',  -- Vervang met je email
  'Jouw Naam',  -- Vervang met je naam
  'free'
)
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name;
