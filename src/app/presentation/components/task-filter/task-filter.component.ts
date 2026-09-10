import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../state/task.store';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters-bar">
      <div class="filter-tabs">
        <button
          class="tab"
          [class.active]="activeFilter === 'ALL'"
          (click)="filterChange.emit('ALL')"
        >
          All Tasks
        </button>
        <button
          class="tab"
          [class.active]="activeFilter === 'PENDING'"
          (click)="filterChange.emit('PENDING')"
        >
          Pending
        </button>
        <button
          class="tab"
          [class.active]="activeFilter === 'IN_PROGRESS'"
          (click)="filterChange.emit('IN_PROGRESS')"
        >
          In Progress
        </button>
        <button
          class="tab"
          [class.active]="activeFilter === 'COMPLETED'"
          (click)="filterChange.emit('COMPLETED')"
        >
          Completed
        </button>
      </div>

      <div class="filter-count">
        Showing <strong>{{ totalVisible }}</strong> tasks
      </div>
    </div>
  `,
  styles: [`
    .filters-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .filter-tabs {
      display: flex;
      background: #f3f4f6;
      padding: 0.25rem;
      border-radius: 10px;
      gap: 0.25rem;

      .tab {
        border: none;
        background: transparent;
        padding: 0.45rem 1rem;
        font-size: 0.85rem;
        font-weight: 500;
        color: #4b5563;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          color: #111827;
        }

        &.active {
          background: #ffffff;
          color: #2563eb;
          font-weight: 600;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
      }
    }

    .filter-count {
      font-size: 0.85rem;
      color: #6b7280;
    }
  `],
})
export class TaskFilterComponent {
  @Input({ required: true }) activeFilter!: TaskFilter;
  @Input({ required: true }) totalVisible!: number;
  @Output() filterChange = new EventEmitter<TaskFilter>();
}
