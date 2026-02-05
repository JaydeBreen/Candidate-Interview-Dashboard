import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-wrapper">
      <nav class="navbar">
        <div class="navbar-content">
          <a href="/" class="navbar-brand">
            <span class="brand-icon">👥</span>
            Candidate Dashboard
          </a>
          <ul class="navbar-menu">
            <li><a href="/">Dashboard</a></li>
            <li><a href="/list">Candidates</a></li>
            <li><a href="/create">Add Candidate</a></li>
          </ul>
        </div>
      </nav>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #f5f7fa;
    }

    .navbar {
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-icon {
      font-size: 1.8rem;
    }

    .navbar-menu {
      display: flex;
      list-style: none;
      gap: 30px;
      margin: 0;
      padding: 0;
    }

    .navbar-menu a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .navbar-menu a:hover {
      color: #667eea;
    }

    .main-content {
      flex: 1;
    }

    @media (max-width: 768px) {
      .navbar-menu {
        gap: 15px;
      }

      .navbar-brand {
        font-size: 1.2rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'candidate-interview-frontend';
}
