import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    if (!task.title.trim()) {
      throw new Error('Task title cannot be empty');
    }
    return this.repository.createTask(task);
  }
}
