import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService, Candidate } from '../../services/candidate.service';

@Component({
  selector: 'app-add-candidate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent {
  candidateForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  successMessage = '';

  statuses = ['Pending', 'Interviewing', 'Hired', 'Rejected'];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private router: Router
  ) {
    this.candidateForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.pattern(/^\d+$/)]],
      status: ['Pending'],
      jobRole: ['']
    });
  }

  get f() {
    return this.candidateForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.successMessage = '';

    if (this.candidateForm.invalid) {
      return;
    }

    this.loading = true;

    const candidate = {
      ...this.candidateForm.value,
      cellphone: this.candidateForm.value.cellphone ? parseInt(this.candidateForm.value.cellphone, 10) : null
    };

    this.candidateService.createCandidate(candidate).subscribe({
      next: (response: Candidate) => {
        this.loading = false;
        this.successMessage = 'Candidate added successfully!';
        this.candidateForm.reset();
        this.submitted = false;
        this.candidateForm.patchValue({ status: 'Pending' });
        
        // Navigate to list after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Error adding candidate:', err);
        
        if (err.status === 0) {
          this.error = 'Cannot connect to server. Is the backend running on port 5000?';
        } else if (err.status === 400 && err.error?.errors) {
          // Handle ASP.NET Core validation errors
          const validationErrors = Object.values(err.error.errors).flat().join(', ');
          this.error = `Validation error: ${validationErrors}`;
        } else {
          this.error = `Failed to add candidate. ${err.statusText || 'Please try again.'}`;
        }
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.candidateForm.get(field);
    return !!(formField && formField.invalid && (formField.dirty || formField.touched || this.submitted));
  }
}
