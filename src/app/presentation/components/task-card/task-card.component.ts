import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/domain/entities/task.entity';
import { TaskPriority } from '../../../core/domain/entities/task-priority.enum';
import { TaskStatus } from '../../../core/domain/entities/task-status.enum';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-card" [class.is-completed]="task.status === TaskStatus.COMPLETED">
      <div class="card-header">
        <span class="category-tag">{{ task.category }}</span>
        <div class="badge-priority" [ngClass]="task.priority.toLowerCase()">
          {{ task.priority }}
        </div>
      </div>

      <div class="card-body">
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-desc" *ngIf="task.description">{{ task.description }}</p>
      </div>

      <div class="card-footer">
        <div class="due-date" *ngIf="task.dueDate">
          📅 {{ task.dueDate }}
        </div>

        <div class="card-actions">
          <select
            class="status-select"
            [value]="task.status"
            (change)="onStatusChange($event)"
          >
            <option [value]="TaskStatus.PENDING">Pending</option>
            <option [value]="TaskStatus.IN_PROGRESS">In Progress</option>
            <option [value]="TaskStatus.COMPLETED">Completed</option>
          </select>

          <button
            class="btn-delete"
            (click)="delete.emit(task.id)"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
      }

      &.is-completed {
        background: #fcfdfc;
        border-left: 4px solid #10b981;

        .task-title {
          text-decoration: line-through;
          color: #6b7280;
        }
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        .category-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #4b5563;
          background: #f3f4f6;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .badge-priority {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          text-transform: uppercase;

          &.high {
            background: #fee2e2;
            color: #dc2626;
          }
          &.medium {
            background: #fef3c7;
            color: #d97706;
          }
          &.low {
            background: #e0f2fe;
            color: #0284c7;
          }
        }
      }

      .card-body {
        margin-bottom: 1rem;

        .task-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.4rem 0;
          line-height: 1.35;
        }

        .task-desc {
          font-size: 0.85rem;
          color: #4b5563;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f3f4f6;
        padding-top: 0.75rem;
        gap: 0.5rem;

        .due-date {
          font-size: 0.775rem;
          color: #6b7280;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;

          .status-select {
            font-size: 0.8rem;
            padding: 0.3rem 0.5rem;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            background: #ffffff;
            color: #374151;
            cursor: pointer;
            outline: none;

            &:focus {
              border-color: #3b82f6;
            }
          }

          .btn-delete {
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            padding: 0.3rem;
            border-radius: 6px;
            opacity: 0.6;
            transition: opacity 0.2s, background 0.2s;

            &:hover {
              opacity: 1;
              background: #fee2e2;
            }
          }
        }
      }
    }
  `],
})
export class TaskCardComponent {
  readonly TaskStatus = TaskStatus;

  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<{ task: Task; status: TaskStatus }>();
  @Output() delete = new EventEmitter<string>();

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.statusChange.emit({
      task: this.task,
      status: select.value as TaskStatus,
    });
  }
}
