import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="header-brand">
        <div class="brand-icon">⚡</div>
        <div class="brand-text">
          <h1>TaskFlow</h1>
          <span class="badge">Clean Architecture & Signals</span>
        </div>
      </div>

      <div class="header-actions">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks, categories..."
            (input)="onSearch($event)"
          />
        </div>

        <button class="btn-primary" (click)="openCreateModal.emit()">
          <span>+</span> New Task
        </button>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 2rem;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .brand-icon {
        font-size: 1.75rem;
        background: #eff6ff;
        padding: 0.4rem;
        border-radius: 12px;
        border: 1px solid #dbeafe;
      }

      .brand-text h1 {
        font-size: 1.35rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
        line-height: 1.2;
      }

      .badge {
        font-size: 0.75rem;
        font-weight: 600;
        color: #2563eb;
        background: #dbeafe;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      .search-box {
        position: relative;
        display: flex;
        align-items: center;

        .search-icon {
          position: absolute;
          left: 0.75rem;
          font-size: 0.85rem;
          color: #9ca3af;
        }

        input {
          padding: 0.55rem 1rem 0.55rem 2.25rem;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 240px;

          &:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
          }
        }
      }

      .btn-primary {
        background: #2563eb;
        color: #ffffff;
        border: none;
        padding: 0.6rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: background 0.2s, transform 0.1s;

        &:hover {
          background: #1d4ed8;
        }

        &:active {
          transform: scale(0.98);
        }
      }
    }
  `],
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  @Output() openCreateModal = new EventEmitter<void>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
