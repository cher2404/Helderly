// Types voor Helderly app

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | null;

export type FolderColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'gray';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly' | null;

export type TaskEnergy = 'low' | 'medium' | 'high' | null;

export interface Recurrence {
  type: RecurrenceType;
  interval: number; // elke X dagen/weken/maanden
  endDate?: Date | string; // optioneel einddatum
  count?: number; // optioneel aantal keren
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  timeOfDay: TimeOfDay; // ochtend/middag/avond
  dueDate?: Date | string; // optioneel datum
  folderId?: string; // optioneel map
  recurrence?: Recurrence; // herhaling
  energy?: TaskEnergy; // energie niveau
  priority?: number; // 1-3, subtiel (1 = hoogste)
  tags?: string[]; // tags voor context
  estimatedMinutes?: number; // geschatte tijd (voor AI suggesties)
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Folder {
  id: string;
  name: string;
  color: FolderColor;
  isShared?: boolean; // Gedeelde map (Teams)
  teamId?: string; // Team ID indien gedeeld
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member'; // Rollen in team
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  ownerId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Voor Focus Mode: taken die geschikt zijn om te focussen
export interface FocusTask extends Task {
  // Extra velden kunnen later toegevoegd worden
}

export type NotificationType = 'task_due' | 'task_reminder' | 'task_completed' | 'deadline_approaching' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  taskId?: string; // Link naar taak indien relevant
  read: boolean;
  createdAt: Date | string;
}
