import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class GetTasksUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(): Observable<Task[]> {
    return this.repository.getTasks();
  }
}
