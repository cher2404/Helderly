import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Team, TeamMember } from '../types';

interface TeamStore {
  teams: Team[];
  currentTeamId: string | null;
  isLoading: boolean;
  
  // Actions
  createTeam: (name: string, description?: string) => Team;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  addMember: (teamId: string, member: Omit<TeamMember, 'id'>) => void;
  removeMember: (teamId: string, memberId: string) => void;
  updateMemberRole: (teamId: string, memberId: string, role: TeamMember['role']) => void;
  setCurrentTeam: (teamId: string | null) => void;
  
  // Helpers
  getTeamById: (id: string) => Team | undefined;
  getAllTeams: () => Team[];
  getCurrentTeam: () => Team | undefined;
  getTeamMembers: (teamId: string) => TeamMember[];
}

const dummyTeam: Team = {
  id: 'team-1',
  name: 'Mijn Team',
  description: 'Het standaard team voor samenwerking',
  ownerId: 'user-1',
  members: [
    {
      id: 'user-1',
      name: 'Jij',
      email: 'jij@voorbeeld.nl',
      role: 'owner',
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useTeamStore = create<TeamStore>()(
  persist(
    (set, get) => ({
      teams: [dummyTeam],
      currentTeamId: null,
      isLoading: false,

      createTeam: (name, description) => {
        const newTeam: Team = {
          id: `team-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          description,
          ownerId: 'user-1', // TODO: haal uit auth context
          members: [
            {
              id: 'user-1',
              name: 'Jij',
              email: 'jij@voorbeeld.nl',
              role: 'owner',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          teams: [...state.teams, newTeam],
        }));
        
        return newTeam;
      },

      updateTeam: (id, updates) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === id
              ? { ...team, ...updates, updatedAt: new Date().toISOString() }
              : team
          ),
        }));
      },

      deleteTeam: (id) => {
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
          currentTeamId: state.currentTeamId === id ? null : state.currentTeamId,
        }));
      },

      addMember: (teamId, memberData) => {
        const newMember: TeamMember = {
          ...memberData,
          id: `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? { ...team, members: [...team.members, newMember], updatedAt: new Date().toISOString() }
              : team
          ),
        }));
      },

      removeMember: (teamId, memberId) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  members: team.members.filter((m) => m.id !== memberId),
                  updatedAt: new Date().toISOString(),
                }
              : team
          ),
        }));
      },

      updateMemberRole: (teamId, memberId, role) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  members: team.members.map((m) =>
                    m.id === memberId ? { ...m, role } : m
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : team
          ),
        }));
      },

      setCurrentTeam: (teamId) => {
        set({ currentTeamId: teamId });
      },

      getTeamById: (id) => {
        return get().teams.find((team) => team.id === id);
      },

      getAllTeams: () => {
        return get().teams;
      },

      getCurrentTeam: () => {
        const { currentTeamId, teams } = get();
        return currentTeamId ? teams.find((t) => t.id === currentTeamId) : undefined;
      },

      getTeamMembers: (teamId) => {
        const team = get().teams.find((t) => t.id === teamId);
        return team?.members || [];
      },
    }),
    {
      name: 'helderly-teams-storage',
    }
  )
);
