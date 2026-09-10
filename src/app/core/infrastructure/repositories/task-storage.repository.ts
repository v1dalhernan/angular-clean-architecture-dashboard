import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/entities/task-priority.enum';
import { TaskStatus } from '../../domain/entities/task-status.enum';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class TaskStorageRepository implements TaskRepository {
  private readonly STORAGE_KEY = 'taskflow_tasks_clean_arch';

  private initialSeed: Task[] = [
    {
      id: 'task-1',
      title: 'Design Clean Architecture Presentation Layer',
      description: 'Implement standalone components with Angular Signals and Smart/Dumb pattern.',
      priority: TaskPriority.HIGH,
      status: TaskStatus.COMPLETED,
      category: 'Frontend',
      dueDate: '2026-09-15',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Connect Signal Store with Domain Use Cases',
      description: 'Decouple UI state from infrastructure using Angular Signals and computed metrics.',
      priority: TaskPriority.HIGH,
      status: TaskStatus.IN_PROGRESS,
      category: 'Architecture',
      dueDate: '2026-09-18',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Setup E2E & Unit Test Coverage',
      description: 'Verify state transitions and use case execution with Jasmine/Karma.',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.PENDING,
      category: 'Quality',
      dueDate: '2026-09-22',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private getStoredTasks(): Task[] {
    if (typeof localStorage === 'undefined') return this.initialSeed;
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.saveStoredTasks(this.initialSeed);
      return this.initialSeed;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return this.initialSeed;
    }
  }

  private saveStoredTasks(tasks: Task[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  getTasks(): Observable<Task[]> {
    return of(this.getStoredTasks());
  }

  getTaskById(id: string): Observable<Task | null> {
    const tasks = this.getStoredTasks();
    const found = tasks.find((t) => t.id === id) || null;
    return of(found);
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    const tasks = this.getStoredTasks();
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    tasks.unshift(newTask);
    this.saveStoredTasks(tasks);
    return of(newTask);
  }

  updateTask(task: Task): Observable<Task> {
    let tasks = this.getStoredTasks();
    tasks = tasks.map((t) => (t.id === task.id ? task : t));
    this.saveStoredTasks(tasks);
    return of(task);
  }

  deleteTask(id: string): Observable<void> {
    let tasks = this.getStoredTasks();
    tasks = tasks.filter((t) => t.id !== id);
    this.saveStoredTasks(tasks);
    return of(undefined);
  }
}
