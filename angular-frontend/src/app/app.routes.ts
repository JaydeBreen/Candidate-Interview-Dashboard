import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create', component: AddCandidateComponent },
  { path: 'list', component: CandidateListComponent },
  { path: '**', redirectTo: '' }
];
