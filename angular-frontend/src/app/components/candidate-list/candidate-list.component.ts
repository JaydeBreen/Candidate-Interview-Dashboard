import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CandidateService, Candidate } from '../../services/candidate.service';
import { CandidateDetailDialogComponent } from '../candidate-detail-dialog/candidate-detail-dialog.component';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, RouterModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  searchTerm: string = '';
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
        this.filteredCandidates = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Failed to load candidates';
        this.loading = false;
        console.error(err);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCandidates = this.candidates;
      return;
    }
    this.filteredCandidates = this.candidates.filter(c => 
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.toLowerCase().includes(term)
    );
  }

  openCandidateDetail(candidate: Candidate): void {
    const dialogRef = this.dialog.open(CandidateDetailDialogComponent, {
      data: candidate,
      width: '500px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCandidates(); 
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}