import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class UpdateTaskStatusUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: Task, newStatus: TaskStatus): Observable<Task> {
    const updated: Task = {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    return this.repository.updateTask(updated);
  }
}
