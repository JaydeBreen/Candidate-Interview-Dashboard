import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Candidate, CandidateService } from '../../services/candidate.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title class="dialog-header">Candidate Details</h2>
    <mat-dialog-content class="dialog-content">
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
      <div class="status-update-container">
        <div class="status-header">
          <label>Update Status</label>
        </div>
        <mat-form-field appearance="outline" class="status-select" subscriptSizing="dynamic">
          <mat-select
            [ngModel]="data.status"
            (ngModelChange)="updateStatus($event)"
            panelClass="status-dropdown-panel"
          >
            <mat-select-trigger>
              <span class="status-badge" [class]="'status-' + (data.status | lowercase)">
                {{ data.status }}
              </span>
            </mat-select-trigger>
            <mat-option *ngFor="let status of statusOptions" [value]="status">
              <span [class]="'status-option status-' + (status | lowercase)">
                {{ status }}
              </span>
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button (click)="onClose()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .dialog-header {
        background: linear-gradient(to right, #667eea, #764ba2);
        color: white;
        padding: 20px;
        margin: -24px -24px 20px -24px;
      }

      .dialog-content {
        padding-top: 0;
        /* Critical: Allow the dropdown to overflow the content area */
        overflow: visible !important;
      }

      .detail-row {
        display: grid;
        grid-template-columns: 120px 1fr;
        align-items: center;
        gap: 20px;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-row label {
        font-weight: 600;
        color: #333;
      }

      .detail-row span {
        color: #666;
      }

      .status-update-container {
        margin-top: 24px;
        margin-bottom: 20px; /* Space above the Close button */
        padding: 16px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        overflow: visible !important;
      }

      .status-header label {
        display: block;
        font-weight: 600;
        color: #555;
        margin-bottom: 12px;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status-select {
        width: 100%;
      }

      .status-badge, .status-option { font-weight: 600; }
      .status-pending { color: #d9a406; }
      .status-interviewing { color: #17a2b8; }
      .status-hired { color: #28a745; }
      .status-rejected { color: #dc3545; }

      mat-dialog-actions {
        padding: 16px 24px;
        border-top: 1px solid #eee;
      }

      button[mat-flat-button] {
        background-color: #667eea;
        color: white;
      }

      /* Global overrides to fix the clipping boundary */
      ::ng-deep .mat-mdc-dialog-content {
        overflow: visible !important;
      }

      ::ng-deep .mat-mdc-dialog-container {
        overflow: visible !important;
      }

      ::ng-deep .status-dropdown-panel {
        background-color: white !important;
      }
    `,
  ],
})
export class CandidateDetailDialogComponent {
  statusOptions = ['Pending', 'Interviewing', 'Hired', 'Rejected'];

  constructor(
    public dialogRef: MatDialogRef<CandidateDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate,
    private candidateService: CandidateService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  updateStatus(newStatus: string): void {
    if (this.data.status === newStatus || !this.data.id) {
      return;
    }

    const updatedCandidate = { ...this.data, status: newStatus };

    this.candidateService
      .updateCandidate(this.data.id, updatedCandidate)
      .subscribe({
        next: () => {
          this.data.status = newStatus;
        },
        error: (err) => {
          console.error('Failed to update candidate status', err);
        },
      });
  }
}