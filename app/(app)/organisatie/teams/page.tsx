'use client';

import { useState, useEffect } from 'react';
import { useTeamStore } from '../../../store/teamStore';
import { useFolderStore } from '../../../store/folderStore';
import { Team, TeamMember } from '../../../types';

export default function TeamsPage() {
  const { teams, createTeam, updateTeam, deleteTeam, addMember, removeMember, updateMemberRole, setCurrentTeam, currentTeamId } = useTeamStore();
  const { folders, userPlan } = useFolderStore();
  const [mounted, setMounted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTeamsPlan = userPlan === 'together';
  const sharedFolders = folders.filter((f) => f.isShared && f.teamId);
  const currentTeam = selectedTeam || (currentTeamId ? teams.find((t) => t.id === currentTeamId) : null);

  const handleCreateTeam = () => {
    if (!teamName.trim()) return;
    const newTeam = createTeam(teamName.trim(), teamDescription.trim() || undefined);
    setTeamName('');
    setTeamDescription('');
    setIsCreateModalOpen(false);
    setSelectedTeam(newTeam);
    setCurrentTeam(newTeam.id);
  };

  const handleInviteMember = () => {
    if (!selectedTeam || !inviteEmail.trim() || !inviteName.trim()) return;
    addMember(selectedTeam.id, {
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: 'member',
    });
    setInviteEmail('');
    setInviteName('');
    setIsInviteModalOpen(false);
  };

  if (!mounted) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-6 pb-24 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-500">Laden...</p>
        </div>
      </div>
    );
  }

  if (!isTeamsPlan) {
    return (
      <div className="app-bg">
        <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-2">Together</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Samenwerken aan gedeelde projecten
            </p>
          </header>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-900/50 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8C46E0] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Together functie beschikbaar</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upgrade naar Together voor gedeelde mappen, team samenwerking en meer
            </p>
            <a
              href="/prijzen"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8C46E0] to-[#7B3FD0] text-white font-semibold hover:shadow-lg hover:shadow-[#8C46E0]/30 hover:scale-105 transition-all duration-300"
            >
              Bekijk Together plan
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-2">Together</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Samenwerken aan gedeelde projecten
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#8C46E0] text-white text-sm font-medium whitespace-nowrap transition-colors hover:bg-[#7B3FD0] shadow-md"
            >
              Nieuw team
            </button>
          </div>
        </header>

        {/* Teams List */}
        {teams.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Nog geen teams. Maak een team om te beginnen met samenwerken.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  currentTeam?.id === team.id
                    ? 'border-[#8C46E0] bg-purple-50/30 dark:bg-purple-950/20'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onClick={() => {
                  setSelectedTeam(team);
                  setCurrentTeam(team.id);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">{team.name}</h3>
                      {currentTeam?.id === team.id && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-[#8C46E0] text-white">
                          Actief
                        </span>
                      )}
                    </div>
                    {team.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{team.description}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Weet je zeker dat je "${team.name}" wilt verwijderen?`)) {
                        deleteTeam(team.id);
                        if (currentTeamId === team.id) {
                          setCurrentTeam(null);
                          setSelectedTeam(null);
                        }
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Verwijderen"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Members */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 3).map((member) => (
                      <div
                        key={member.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8C46E0] to-purple-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-950"
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {team.members.length} {team.members.length === 1 ? 'lid' : 'leden'}
                  </span>
                  {team.members.length > 3 && (
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      +{team.members.length - 3}
                    </span>
                  )}
                </div>

                {/* Team Actions */}
                {currentTeam?.id === team.id && (
                  <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTeam(team);
                        setIsInviteModalOpen(true);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      Lid uitnodigen
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Navigate to shared folders for this team
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      Gedeelde mappen
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Gedeelde mappen sectie */}
        {currentTeam && sharedFolders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Gedeelde mappen ({currentTeam.name})
            </h2>
            <div className="space-y-2">
              {sharedFolders
                .filter((f) => f.teamId === currentTeam.id)
                .map((folder) => (
                  <div
                    key={folder.id}
                    className="p-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${folder.color}-100 dark:bg-${folder.color}-950/30 flex items-center justify-center`}>
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-foreground">{folder.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Gedeeld</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Create Team Modal */}
        {isCreateModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setIsCreateModalOpen(false);
                setTeamName('');
                setTeamDescription('');
              }}
            />
            <div className="fixed bottom-0 left-0 right-0 md:fixed md:right-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-96 bg-white dark:bg-gray-950 border-t md:border border-gray-200 dark:border-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl z-50 max-h-[85vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-900">
                <h2 className="text-lg font-semibold text-foreground">Nieuw team</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Naam *</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team naam..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Beschrijving</label>
                  <textarea
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    placeholder="Optionele beschrijving..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm resize-none"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-900 space-y-2">
                <button
                  onClick={handleCreateTeam}
                  disabled={!teamName.trim()}
                  className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#7B3FD0]"
                >
                  Team aanmaken
                </button>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setTeamName('');
                    setTeamDescription('');
                  }}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </>
        )}

        {/* Invite Member Modal */}
        {isInviteModalOpen && selectedTeam && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setIsInviteModalOpen(false);
                setInviteEmail('');
                setInviteName('');
              }}
            />
            <div className="fixed bottom-0 left-0 right-0 md:fixed md:right-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-96 bg-white dark:bg-gray-950 border-t md:border border-gray-200 dark:border-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl z-50 max-h-[85vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-900">
                <h2 className="text-lg font-semibold text-foreground">Lid uitnodigen</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedTeam.name}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Naam *</label>
                  <input
                    type="text"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="Naam van het lid..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">E-mail *</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="email@voorbeeld.nl"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C46E0] focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-900 space-y-2">
                <button
                  onClick={handleInviteMember}
                  disabled={!inviteEmail.trim() || !inviteName.trim()}
                  className="w-full px-5 py-3 rounded-lg bg-[#8C46E0] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#7B3FD0]"
                >
                  Uitnodigen
                </button>
                <button
                  onClick={() => {
                    setIsInviteModalOpen(false);
                    setInviteEmail('');
                    setInviteName('');
                  }}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
