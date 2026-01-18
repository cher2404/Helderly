-- ============================================
-- HELDERLY SUPABASE DATABASE SCHEMA
-- ============================================
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- 
-- Dit schema maakt alle benodigde tabellen aan voor Helderly:
-- - Profiles (user profielen)
-- - Folders (mappen voor taken)
-- - Tasks (taken)
-- - Teams (teams voor samenwerking)
-- - Team Members (team leden)
-- - Notifications (notificaties)
--
-- Met Row Level Security (RLS) policies voor veiligheid
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
-- Gebruikersprofielen gekoppeld aan Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'together')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FOLDERS TABLE
-- ============================================
-- Mappen voor het organiseren van taken
CREATE TABLE IF NOT EXISTS folders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT 'blue' CHECK (color IN ('blue', 'purple', 'green', 'orange', 'pink', 'gray')),
  is_shared BOOLEAN DEFAULT FALSE,
  team_id UUID, -- Wordt later gekoppeld aan teams tabel
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TASKS TABLE
-- ============================================
-- Taken van gebruikers
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
  due_date TIMESTAMP WITH TIME ZONE,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon', 'evening')),
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  priority INTEGER CHECK (priority BETWEEN 1 AND 3), -- 1 = hoogste
  energy TEXT CHECK (energy IN ('low', 'medium', 'high')),
  recurrence JSONB, -- {type: 'daily'|'weekly'|'monthly'|'yearly', interval: number, endDate?: string, count?: number}
  tags TEXT[],
  estimated_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TEAMS TABLE
-- ============================================
-- Teams voor samenwerking
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
-- Leden van teams
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Update folders table to reference teams
ALTER TABLE folders 
  ADD CONSTRAINT folders_team_id_fkey 
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
-- Notificaties voor gebruikers
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('task_due', 'task_reminder', 'task_completed', 'deadline_approaching', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES voor performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_folder_id ON tasks(folder_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_folders_user_id ON folders(user_id);
CREATE INDEX IF NOT EXISTS idx_folders_team_id ON folders(team_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) ENABLE
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PROFILES
-- ============================================
-- Users can view own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can insert own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- RLS POLICIES - TASKS
-- ============================================
-- Users can view own tasks
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert own tasks
CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update own tasks
CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own tasks
CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - FOLDERS
-- ============================================
-- Users can view own folders and shared folders
CREATE POLICY "Users can view own folders" ON folders
  FOR SELECT USING (
    auth.uid() = user_id 
    OR (is_shared = TRUE AND team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    ))
  );

-- Users can insert own folders
CREATE POLICY "Users can insert own folders" ON folders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update own folders
CREATE POLICY "Users can update own folders" ON folders
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own folders
CREATE POLICY "Users can delete own folders" ON folders
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - TEAMS
-- ============================================
-- Users can view teams they're members of
CREATE POLICY "Users can view teams" ON teams
  FOR SELECT USING (
    auth.uid() = owner_id 
    OR id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Users can insert teams (become owner)
CREATE POLICY "Users can insert teams" ON teams
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Users can update teams if owner or admin
CREATE POLICY "Users can update teams" ON teams
  FOR UPDATE USING (
    auth.uid() = owner_id 
    OR id IN (
      SELECT team_id FROM team_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Users can delete teams if owner
CREATE POLICY "Users can delete teams" ON teams
  FOR DELETE USING (auth.uid() = owner_id);

-- ============================================
-- RLS POLICIES - TEAM MEMBERS
-- ============================================
-- Users can view team members of teams they're in
CREATE POLICY "Users can view team members" ON team_members
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR team_id IN (SELECT id FROM teams WHERE owner_id = auth.uid())
  );

-- Team owners and admins can add members
CREATE POLICY "Users can add team members" ON team_members
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT id FROM teams WHERE owner_id = auth.uid()
    )
    OR team_id IN (
      SELECT team_id FROM team_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Team owners and admins can update members
CREATE POLICY "Users can update team members" ON team_members
  FOR UPDATE USING (
    team_id IN (SELECT id FROM teams WHERE owner_id = auth.uid())
    OR team_id IN (
      SELECT team_id FROM team_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Team owners and admins can remove members
CREATE POLICY "Users can remove team members" ON team_members
  FOR DELETE USING (
    team_id IN (SELECT id FROM teams WHERE owner_id = auth.uid())
    OR team_id IN (
      SELECT team_id FROM team_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- ============================================
-- RLS POLICIES - NOTIFICATIONS
-- ============================================
-- Users can view own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- System can insert notifications (via service role or trigger)
CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true); -- We'll use service role for inserts

-- Users can update own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own notifications
CREATE POLICY "Users can delete own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers voor updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_folders_updated_at BEFORE UPDATE ON folders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VOLTOOID!
-- ============================================
-- Je database schema is nu klaar!
-- 
-- Volgende stappen:
-- 1. Test de tabellen in Supabase Table Editor
-- 2. Genereer TypeScript types: Settings > API > Generate TypeScript types
-- 3. Test de connectie vanuit je Next.js app
-- ============================================
