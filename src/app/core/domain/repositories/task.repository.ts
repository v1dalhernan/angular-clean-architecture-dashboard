import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract getTasks(): Observable<Task[]>;
  abstract getTaskById(id: string): Observable<Task | null>;
  abstract createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(id: string): Observable<void>;
}
