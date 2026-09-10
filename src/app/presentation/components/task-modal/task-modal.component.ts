import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskPriority } from '../../../core/domain/entities/task-priority.enum';
import { TaskStatus } from '../../../core/domain/entities/task-status.enum';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Create New Task</h2>
          <button class="btn-close" (click)="close.emit()">✕</button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Title *</label>
            <input
              id="title"
              type="text"
              formControlName="title"
              placeholder="e.g. Implement OAuth Flow"
            />
            <span class="error" *ngIf="form.get('title')?.invalid && form.get('title')?.touched">
              Title is required
            </span>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              rows="3"
              formControlName="description"
              placeholder="Detailed description..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" formControlName="priority">
                <option [value]="TaskPriority.LOW">Low</option>
                <option [value]="TaskPriority.MEDIUM">Medium</option>
                <option [value]="TaskPriority.HIGH">High</option>
              </select>
            </div>

            <div class="form-group">
              <label for="category">Category</label>
              <input
                id="category"
                type="text"
                formControlName="category"
                placeholder="Frontend, Backend..."
              />
            </div>
          </div>

          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input id="dueDate" type="date" formControlName="dueDate" />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" (click)="close.emit()">
              Cancel
            </button>
            <button type="submit" class="btn-primary" [disabled]="form.invalid">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 1rem;
    }

    .modal-content {
      background: #ffffff;
      border-radius: 16px;
      width: 100%;
      max-width: 480px;
      padding: 1.75rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;

        h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .btn-close {
          background: transparent;
          border: none;
          font-size: 1.25rem;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 6px;
          padding: 0.2rem;

          &:hover {
            color: #111827;
          }
        }
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 1rem;

        label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
        }

        input, textarea, select {
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 0.875rem;
          outline: none;
          font-family: inherit;

          &:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          }
        }

        .error {
          font-size: 0.75rem;
          color: #ef4444;
        }
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;

        button {
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-secondary {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #4b5563;

          &:hover {
            background: #e5e7eb;
          }
        }

        .btn-primary {
          background: #2563eb;
          border: none;
          color: #ffffff;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          &:hover:not(:disabled) {
            background: #1d4ed8;
          }
        }
      }
    }
  `],
})
export class TaskModalComponent {
  readonly TaskPriority = TaskPriority;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: [TaskPriority.MEDIUM],
      category: ['General'],
      dueDate: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.save.emit({
      ...this.form.value,
      status: TaskStatus.PENDING,
      dueDate: this.form.value.dueDate || null,
    });
    this.close.emit();
  }
}
