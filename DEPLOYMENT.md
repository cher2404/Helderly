# Deployment & Supabase Setup Guide

## 🚀 Deploy naar Vercel

### Stap 1: GitHub Repository (optioneel maar aanbevolen)
1. Maak een GitHub repository aan
2. Push je code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/jouw-username/helderly.git
   git push -u origin main
   ```

### Stap 2: Vercel Account
1. Ga naar [vercel.com](https://vercel.com)
2. Maak een account (gratis) of log in met GitHub
3. Klik op "New Project"

### Stap 3: Import Project
1. **Optie A - Via GitHub (aanbevolen)**:
   - Kies je repository
   - Vercel detecteert automatisch Next.js
   - Klik "Deploy"

2. **Optie B - Via CLI**:
   ```bash
   npm i -g vercel
   cd helderly
   vercel
   ```
   - Volg de prompts
   - Kies defaults voor meeste vragen

### Stap 4: Environment Variables (na Supabase setup)
Na het opzetten van Supabase, voeg deze toe in Vercel:
- Ga naar je project in Vercel
- Settings > Environment Variables
- Voeg toe:
  - `NEXT_PUBLIC_SUPABASE_URL` = `https://vnovojphzvwjuskbfjpg.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZub3ZvanBoenZ3anVza2JmanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NzQ1NjEsImV4cCI6MjA4NDI1MDU2MX0.jTfvLlIfkEjCCk1naSxUYiqfHqHzkyw44wjxxQ383B8`
- Selecteer alle environments (Production, Preview, Development)

### Stap 5: Deploy
- Vercel deployt automatisch bij elke push naar main branch
- Of klik "Deploy" in Vercel dashboard

---

## 🗄️ Supabase Setup & Connectie

### Stap 1: Supabase Project Aanmaken
1. Ga naar [supabase.com](https://supabase.com)
2. Maak een account (gratis tier is prima voor start)
3. Klik "New Project"
4. Vul in:
   - **Project Name**: `helderly` (of kies eigen naam)
   - **Database Password**: Genereer een sterk wachtwoord (bewaar deze!)
   - **Region**: Kies dichtstbijzijnde (bijv. `West EU` voor Nederland)
5. Klik "Create new project" (dit duurt 1-2 minuten)

### Stap 2: API Keys Ophalen
1. In je Supabase project dashboard
2. Ga naar Settings > API
3. Noteer:
   - **Project URL** (bijv. `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### Stap 3: Database Schema Aanmaken
In Supabase SQL Editor, voer dit uit:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (gebruikt Supabase Auth, maar we maken een profiel tabel)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'together')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date TIMESTAMP WITH TIME ZONE,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon', 'evening')),
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  energy TEXT CHECK (energy IN ('low', 'medium', 'high')),
  recurrence JSONB,
  tags TEXT[],
  estimated_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Folders table
CREATE TABLE IF NOT EXISTS folders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT 'blue',
  is_shared BOOLEAN DEFAULT FALSE,
  team_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tasks: users can only see/edit their own tasks
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Folders: users can only see/edit their own folders
CREATE POLICY "Users can view own folders" ON folders
  FOR SELECT USING (auth.uid() = user_id OR is_shared = TRUE);

CREATE POLICY "Users can insert own folders" ON folders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own folders" ON folders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own folders" ON folders
  FOR DELETE USING (auth.uid() = user_id);

-- Teams: members can view teams
CREATE POLICY "Team members can view teams" ON teams
  FOR SELECT USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

-- Indexes voor betere performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_folders_user_id ON folders(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
```

### Stap 4: Supabase Client Installeren
```bash
npm install @supabase/supabase-js
```

### Stap 5: Supabase Client Setup
Maak een `.env.local` bestand (niet committen naar git):

```env
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier
```

### Stap 6: Supabase Client Helper
Maak `lib/supabase.ts` (zie volgende bestand)

### Stap 7: Auth Setup
Supabase Auth is al geïntegreerd. Gebruik:
- `/login` pagina voor inloggen
- `/signup` pagina voor registreren
- Supabase Auth handles email verificatie automatisch

---

## 📝 Checklist voor Production

- [ ] Supabase project aangemaakt
- [ ] Database schema uitgevoerd
- [ ] API keys genoteerd
- [ ] `.env.local` bestand aangemaakt
- [ ] Supabase client geconfigureerd
- [ ] Vercel project aangemaakt
- [ ] Environment variables toegevoegd in Vercel
- [ ] Test deployment gedaan
- [ ] Login/signup getest
- [ ] Data sync getest

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - Deze staat al in `.gitignore`
2. **RLS Policies** - Zijn al geconfigureerd voor data security
3. **API Keys** - Anon key kan publiek (RLS beschermt data)
4. **Service Role Key** - Gebruik deze NOOIT in client-side code

---

## 📚 Nuttige Links

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
