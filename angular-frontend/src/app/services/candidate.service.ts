import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: number | null;
  status: string;
  jobRole: string;
}

export interface Summary {
  total: number;
  hired: number;
  rejected: number;
  interviewing: number;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) { }

  // Get all candidates
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  // Get summary stats
  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/summary`);
  }

  // Create new candidate
  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  // Update existing candidate
updateCandidate(id: number, candidate: Candidate): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, candidate);
}
}
