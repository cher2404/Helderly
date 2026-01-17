// Dummy data voor development
import { Task, Folder } from '../types';

export const dummyFolders: Folder[] = [
  {
    id: 'folder-1',
    name: 'Werk',
    color: 'blue',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder-2',
    name: 'Persoonlijk',
    color: 'purple',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const dummyTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Projectplan Helderly reviewen',
    description: 'Feedback verwerken en doorsturen naar team',
    status: 'todo',
    timeOfDay: 'morning',
    folderId: 'folder-1',
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Design systeem documenteren',
    status: 'todo',
    timeOfDay: 'afternoon',
    folderId: 'folder-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'Boodschappen doen',
    status: 'todo',
    timeOfDay: 'evening',
    folderId: 'folder-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Code review pull request',
    status: 'in-progress',
    timeOfDay: 'morning',
    folderId: 'folder-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper: get tasks voor vandaag
export function getTasksForToday(tasks: Task[]): Task[] {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => {
    if (!task.dueDate) return true; // Taken zonder datum zijn "vandaag"
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
    return taskDate === today;
  });
}

// Helper: get tasks die geschikt zijn voor Focus Mode (status todo of in-progress)
export function getFocusTasks(tasks: Task[]): Task[] {
  return tasks.filter(task => 
    task.status === 'todo' || task.status === 'in-progress'
  );
}
