import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskMetrics } from '../../core/domain/entities/task.entity';
import { TaskPriority } from '../../core/domain/entities/task-priority.enum';
import { TaskStatus } from '../../core/domain/entities/task-status.enum';
import { CreateTaskUseCase } from '../../core/domain/usecases/create-task.usecase';
import { DeleteTaskUseCase } from '../../core/domain/usecases/delete-task.usecase';
import { GetTasksUseCase } from '../../core/domain/usecases/get-tasks.usecase';
import { UpdateTaskStatusUseCase } from '../../core/domain/usecases/update-task-status.usecase';

export type TaskFilter = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  // Signals State
  private readonly _tasks = signal<Task[]>([]);
  private readonly _filter = signal<TaskFilter>('ALL');
  private readonly _searchQuery = signal<string>('');
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Public Readonly Signals
  readonly tasks = this._tasks.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed Signals
  readonly filteredTasks = computed(() => {
    const list = this._tasks();
    const currentFilter = this._filter();
    const query = this._searchQuery().toLowerCase().trim();

    return list.filter((task) => {
      // Filter status
      const matchesStatus =
        currentFilter === 'ALL' || task.status === currentFilter;

      // Filter search
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  });

  readonly metrics = computed<TaskMetrics>(() => {
    const all = this._tasks();
    const total = all.length;
    const pending = all.filter((t) => t.status === TaskStatus.PENDING).length;
    const inProgress = all.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
    const completed = all.filter((t) => t.status === TaskStatus.COMPLETED).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, pending, inProgress, completed, completionRate };
  });

  constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    this._loading.set(true);
    this.getTasksUseCase.execute().subscribe({
      next: (data) => {
        this._tasks.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load tasks');
        this._loading.set(false);
      },
    });
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    this.createTaskUseCase.execute(task).subscribe({
      next: (created) => {
        this._tasks.update((prev) => [created, ...prev]);
      },
      error: (err) => this._error.set(err.message),
    });
  }

  changeStatus(task: Task, newStatus: TaskStatus): void {
    this.updateTaskStatusUseCase.execute(task, newStatus).subscribe({
      next: (updated) => {
        this._tasks.update((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t)),
        );
      },
      error: (err) => this._error.set(err.message),
    });
  }

  removeTask(id: string): void {
    this.deleteTaskUseCase.execute(id).subscribe({
      next: () => {
        this._tasks.update((prev) => prev.filter((t) => t.id !== id));
      },
      error: (err) => this._error.set(err.message),
    });
  }

  setFilter(filter: TaskFilter): void {
    this._filter.set(filter);
  }

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }
}
