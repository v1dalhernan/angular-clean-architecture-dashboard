import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskMetrics } from '../../../core/domain/entities/task.entity';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metrics-grid">
      <div class="metric-card total">
        <div class="metric-info">
          <span class="label">Total Tasks</span>
          <span class="value">{{ metrics.total }}</span>
        </div>
        <div class="icon">📋</div>
      </div>

      <div class="metric-card pending">
        <div class="metric-info">
          <span class="label">Pending</span>
          <span class="value">{{ metrics.pending }}</span>
        </div>
        <div class="icon">⏳</div>
      </div>

      <div class="metric-card in-progress">
        <div class="metric-info">
          <span class="label">In Progress</span>
          <span class="value">{{ metrics.inProgress }}</span>
        </div>
        <div class="icon">🚀</div>
      </div>

      <div class="metric-card completed">
        <div class="metric-info">
          <span class="label">Completed</span>
          <span class="value">{{ metrics.completed }}</span>
        </div>
        <div class="icon">✅</div>
      </div>

      <div class="metric-card rate">
        <div class="metric-info">
          <span class="label">Completion Rate</span>
          <span class="value">{{ metrics.completionRate }}%</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar" [style.width.%]="metrics.completionRate"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .metric-card {
      background: #ffffff;
      padding: 1.25rem;
      border-radius: 14px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: hidden;

      .metric-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .label {
          font-size: 0.775rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
        }
      }

      .icon {
        font-size: 1.5rem;
        opacity: 0.85;
      }

      &.rate {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .progress-container {
          width: 100%;
          height: 6px;
          background: #f3f4f6;
          border-radius: 9999px;
          margin-top: 0.5rem;
          overflow: hidden;

          .progress-bar {
            height: 100%;
            background: #10b981;
            transition: width 0.4s ease;
          }
        }
      }
    }
  `],
})
export class MetricsComponent {
  @Input({ required: true }) metrics!: TaskMetrics;
}
