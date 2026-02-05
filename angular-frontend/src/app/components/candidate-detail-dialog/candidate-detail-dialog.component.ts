import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Candidate } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="dialog-header">
      <h2>Candidate Details</h2>
    </div>
    <div class="dialog-content">
      <div class="detail-row">
        <label>ID:</label>
        <span>{{ data.id }}</span>
      </div>
      <div class="detail-row">
        <label>First Name:</label>
        <span>{{ data.firstName }}</span>
      </div>
      <div class="detail-row">
        <label>Last Name:</label>
        <span>{{ data.lastName }}</span>
      </div>
      <div class="detail-row">
        <label>Email:</label>
        <span>{{ data.email }}</span>
      </div>
      <div class="detail-row">
        <label>Cellphone:</label>
        <span>{{ data.cellphone }}</span>
      </div>
      <div class="detail-row">
        <label>Job Role:</label>
        <span>{{ data.jobRole }}</span>
      </div>
      <div class="detail-row">
        <label>Status:</label>
        <span [class]="'status-badge status-' + data.status.toLowerCase()">
          {{ data.status }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .dialog-header {
      background-color: #667eea;
      color: white;
      padding: 20px;
      margin: -16px -16px 20px -16px;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .dialog-content {
      padding: 20px;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 20px;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .detail-row label {
      font-weight: 600;
      color: #333;
    }

    .detail-row span {
      color: #666;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .status-pending {
      background-color: #ffc107;
      color: #000;
    }

    .status-interviewing {
      background-color: #17a2b8;
      color: white;
    }

    .status-hired {
      background-color: #28a745;
      color: white;
    }

    .status-rejected {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class CandidateDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidate) { }
}
