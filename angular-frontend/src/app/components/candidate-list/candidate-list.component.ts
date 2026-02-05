import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CandidateService, Candidate } from '../../services/candidate.service';
import { CandidateDetailDialogComponent } from '../candidate-detail-dialog/candidate-detail-dialog.component';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  loading = true;
  error = '';

  constructor(
    private candidateService: CandidateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data: Candidate[]) => {
        this.candidates = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Failed to load candidates';
        this.loading = false;
        console.error(err);
      }
    });
  }

  openCandidateDetail(candidate: Candidate): void {
    this.dialog.open(CandidateDetailDialogComponent, {
      data: candidate,
      width: '500px',
      maxWidth: '90vw'
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
