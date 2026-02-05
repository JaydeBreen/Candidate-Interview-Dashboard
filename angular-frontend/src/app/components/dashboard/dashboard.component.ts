import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateService, Summary } from '../../services/candidate.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: Summary | null = null;
  loading = true;
  error = '';

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.candidateService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load summary data';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
