import { TaskPriority } from './task-priority.enum';
import { TaskStatus } from './task-status.enum';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskMetrics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  completionRate: number;
}
