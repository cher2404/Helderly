// ============================================
// HELDERLY SUPABASE DATABASE TYPES
// ============================================
// Deze types zijn gebaseerd op het database schema
// Genereerd handmatig op basis van supabase-schema.sql
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          plan: 'free' | 'pro' | 'together'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          plan?: 'free' | 'pro' | 'together'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          plan?: 'free' | 'pro' | 'together'
          created_at?: string
          updated_at?: string
        }
      }
      folders: {
        Row: {
          id: string
          user_id: string
          name: string
          color: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'gray'
          is_shared: boolean
          team_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'gray'
          is_shared?: boolean
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'gray'
          is_shared?: boolean
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'todo' | 'in-progress' | 'done'
          due_date: string | null
          time_of_day: 'morning' | 'afternoon' | 'evening' | null
          folder_id: string | null
          priority: number | null
          energy: 'low' | 'medium' | 'high' | null
          recurrence: Json | null
          tags: string[] | null
          estimated_minutes: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'done'
          due_date?: string | null
          time_of_day?: 'morning' | 'afternoon' | 'evening' | null
          folder_id?: string | null
          priority?: number | null
          energy?: 'low' | 'medium' | 'high' | null
          recurrence?: Json | null
          tags?: string[] | null
          estimated_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'done'
          due_date?: string | null
          time_of_day?: 'morning' | 'afternoon' | 'evening' | null
          folder_id?: string | null
          priority?: number | null
          energy?: 'low' | 'medium' | 'high' | null
          recurrence?: Json | null
          tags?: string[] | null
          estimated_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'task_due' | 'task_reminder' | 'task_completed' | 'deadline_approaching' | 'system'
          title: string
          message: string
          task_id: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'task_due' | 'task_reminder' | 'task_completed' | 'deadline_approaching' | 'system'
          title: string
          message: string
          task_id?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'task_due' | 'task_reminder' | 'task_completed' | 'deadline_approaching' | 'system'
          title?: string
          message?: string
          task_id?: string | null
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      // Views kunnen later worden toegevoegd
      [_ in never]: never
    }
    Functions: {
      // Functions kunnen later worden toegevoegd
      [_ in never]: never
    }
    Enums: {
      // Enums kunnen later worden toegevoegd
      [_ in never]: never
    }
  }
}
