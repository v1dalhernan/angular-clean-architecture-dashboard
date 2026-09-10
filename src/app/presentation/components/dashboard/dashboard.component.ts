import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/domain/entities/task.entity';
import { TaskStatus } from '../../../core/domain/entities/task-status.enum';
import { TaskFilter, TaskStore } from '../../state/task.store';
import { HeaderComponent } from '../header/header.component';
import { MetricsComponent } from '../metrics/metrics.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MetricsComponent,
    TaskFilterComponent,
    TaskCardComponent,
    TaskModalComponent,
  ],
  template: `
    <div class="dashboard-layout">
      <app-header
        (search)="onSearch($event)"
        (openCreateModal)="showModal.set(true)"
      />

      <main class="dashboard-main">
        <app-metrics [metrics]="store.metrics()" />

        <app-task-filter
          [activeFilter]="store.filter()"
          [totalVisible]="store.filteredTasks().length"
          (filterChange)="onFilterChange($event)"
        />

        <div class="task-grid" *ngIf="store.filteredTasks().length > 0; else emptyState">
          <app-task-card
            *ngFor="let task of store.filteredTasks()"
            [task]="task"
            (statusChange)="onStatusChange($event)"
            (delete)="onDelete($event)"
          />
        </div>

        <ng-template #emptyState>
          <div class="empty-state">
            <div class="empty-icon">📂</div>
            <h3>No tasks found</h3>
            <p>Try changing your filter or add a new task to get started.</p>
            <button class="btn-create" (click)="showModal.set(true)">
              + Create First Task
            </button>
          </div>
        </ng-template>
      </main>

      <app-task-modal
        *ngIf="showModal()"
        (close)="showModal.set(false)"
        (save)="onSaveTask($event)"
      />
    </div>
  `,
  styles: [`
    .dashboard-layout {
      min-height: 100vh;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
    }

    .dashboard-main {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 2rem;
      box-sizing: border-box;
    }

    .task-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }

    .empty-state {
      background: #ffffff;
      border: 2px dashed #e5e7eb;
      border-radius: 16px;
      padding: 3.5rem 1.5rem;
      text-align: center;
      margin-top: 1rem;

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 0.75rem;
      }

      h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #111827;
        margin: 0 0 0.4rem 0;
      }

      p {
        font-size: 0.9rem;
        color: #6b7280;
        margin: 0 0 1.5rem 0;
      }

      .btn-create {
        background: #2563eb;
        color: #ffffff;
        border: none;
        padding: 0.65rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: #1d4ed8;
        }
      }
    }
  `],
})
export class DashboardComponent {
  readonly store = inject(TaskStore);
  showModal = signal<boolean>(false);

  onSearch(query: string): void {
    this.store.setSearchQuery(query);
  }

  onFilterChange(filter: TaskFilter): void {
    this.store.setFilter(filter);
  }

  onStatusChange(event: { task: Task; status: TaskStatus }): void {
    this.store.changeStatus(event.task, event.status);
  }

  onDelete(id: string): void {
    this.store.removeTask(id);
  }

  onSaveTask(task: any): void {
    this.store.addTask(task);
  }
}
