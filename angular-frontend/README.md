# Candidate Interview Dashboard - Frontend (Angular)

A modern, responsive Angular application for managing job candidates. This frontend complements the ASP.NET 9 Core backend API to provide a complete HR dashboard solution.

## 🚀 Features

- **Dashboard**: View candidate statistics at a glance (Total, Hired, Rejected)
- **Add Candidate Form**: Create new candidates with full validation
- **Candidate List**: Browse all candidates in a clean table format
- **Modal Dialog**: View detailed information about each candidate in a popup
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation**: Real-time validation with helpful error messages

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - comes with Node.js
- **Angular CLI** (optional but recommended)
  ```bash
  npm install -g @angular/cli
  ```

## 🔧 Setup & Installation

### 1. Navigate to the Frontend Directory

```bash
cd angular-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Angular framework (v19.0.0)
- Angular Material (v19.0.0) - for dialog components
- RxJS - for reactive programming
- TypeScript - for type safety

### 3. Configure the Backend URL (if needed)

The frontend connects to the backend API at `http://localhost:5000/api/candidates`.

If your backend runs on a different port, update the API URL in:

**File**: `src/app/services/candidate.service.ts`

```typescript
private apiUrl = 'http://localhost:5000/api/candidates'; // Change port if needed
```

## 🏃 Running the Application

### Start the Development Server

```bash
npm start
```

Or use Angular CLI directly:

```bash
ng serve
```

The application will be available at: **http://localhost:4200**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/candidate-interview-frontend` folder.

## 📖 Application Structure

```
angular-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/              # Home page with stat cards
│   │   │   ├── add-candidate/          # Form for creating candidates
│   │   │   ├── candidate-list/         # Table view of candidates
│   │   │   └── candidate-detail-dialog/ # Modal for candidate details
│   │   ├── services/
│   │   │   └── candidate.service.ts    # API communication
│   │   ├── app.routes.ts               # Route configuration
│   │   ├── app.config.ts               # App configuration
│   │   └── app.ts                      # Root component
│   ├── main.ts                         # Bootstrap file
│   ├── index.html                      # HTML template
│   └── styles.css                      # Global styles
├── package.json                        # Dependencies
├── angular.json                        # Angular configuration
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # This file
```

## 🎨 UI Components Overview

### 1. **Dashboard Component** (`/`)

Displays key metrics in stat cards:
- Total number of candidates
- Number of hired candidates
- Number of rejected candidates

Quick action buttons to navigate to Add Candidate or View All Candidates.

### 2. **Add Candidate Component** (`/create`)

**Features:**
- Reactive form using Angular `FormBuilder`
- Field validation with real-time feedback
- Success/error messages

**Form Fields:**
- First Name (required, min 2 chars)
- Last Name (required, min 2 chars)
- Email (required, valid email format)
- Cellphone (required, numbers only)
- Job Role (required, min 2 chars)
- Status (dropdown: Pending, Interviewing, Hired, Rejected)

**Validation Logic:**
The submit button is disabled until all required fields are valid. This prevents invalid data submission.

### 3. **Candidate List Component** (`/list`)

Displays all candidates in a responsive table with:
- Candidate ID, First Name, Last Name, Email, Job Role
- Status badge with color coding
- "View" button for each candidate

### 4. **Candidate Detail Dialog Component**

A modal popup showing complete candidate information:
- ID
- First Name, Last Name
- Email
- Cellphone
- Job Role
- Status (with visual badge)

## 🔍 Modal & Validation Implementation Details

### Modal Implementation (Angular Material Dialog)

The modal is implemented using **Angular Material's `MatDialog`** component:

```typescript
// In candidate-list.component.ts
openCandidateDetail(candidate: Candidate): void {
  this.dialog.open(CandidateDetailDialogComponent, {
    data: candidate,
    width: '500px',
    maxWidth: '90vw'  // Responsive on mobile
  });
}
```

**Why Angular Material?**
- Professional, accessible dialog component
- Built-in animations and styling
- Responsive design
- Keyboard and mouse interaction support
- Backdrop click to close

**How it works:**
1. Click "View" button on any candidate row
2. `MatDialog.open()` creates a modal instance
3. Candidate data is passed via `data` property
4. Component receives data using `@Inject(MAT_DIALOG_DATA)`
5. Modal displays in a centered popup over the page
6. Press Escape or click outside to close

### Form Validation Implementation

**Technology Used:** Angular Reactive Forms with `FormBuilder`

```typescript
this.candidateForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  cellphone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  status: ['Pending', Validators.required],
  jobRole: ['', [Validators.required, Validators.minLength(2)]]
});
```

**Key Features:**

1. **Required Field Validation**: All critical fields must be filled
2. **Email Validation**: Built-in email format validation
3. **Pattern Matching**: Cellphone must contain only numbers
4. **Min Length**: Names and job roles must be at least 2 characters
5. **Real-time Feedback**: Errors display as user types
6. **Button State**: Submit button disabled until form is valid

**Validation Error Display:**
```html
<small *ngIf="isFieldInvalid('email')" class="error-message">
  <span *ngIf="f['email'].errors?.['required']">Email is required</span>
  <span *ngIf="f['email'].errors?.['email']">Please enter a valid email</span>
</small>
```

## 🔄 API Communication

The `CandidateService` handles all HTTP requests to the backend:

```typescript
// Get all candidates
getCandidates(): Observable<Candidate[]>

// Get summary statistics
getSummary(): Observable<Summary>

// Create a new candidate
createCandidate(candidate: Candidate): Observable<Candidate>
```

**Error Handling**: Components subscribe to observables and handle both success and error scenarios with user-friendly messages.

## 🎯 User Workflows

### Adding a Candidate
1. Click "Add Candidate" button
2. Fill in all required fields
3. See real-time validation errors
4. Click "Submit" (button is only enabled when form is valid)
5. See success message and auto-redirect to candidates list

### Viewing Candidates
1. Navigate to "Candidates" page
2. View all candidates in a table
3. Click "View" on any row
4. Modal opens showing full details
5. Close modal with Escape key or click outside

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The built files in `dist/candidate-interview-frontend` can be deployed to:
- **Static hosting**: GitHub Pages, Vercel, Netlify
- **Web server**: Nginx, Apache, IIS
- **Cloud services**: Azure Static Web Apps, AWS S3, Google Cloud Storage

### Environment Configuration

Before deploying, ensure the backend API URL matches your environment:

```typescript
// For production
private apiUrl = 'https://your-api-domain.com/api/candidates';
```

## 🐛 Troubleshooting

### Port 4200 Already in Use

```bash
ng serve --port 4300
```

### Backend Connection Error

Ensure:
1. Backend is running on the correct port (default: 5000)
2. CORS is enabled in backend (already configured in your ASP.NET app)
3. API URL in `candidate.service.ts` matches your backend address

### Dependencies Installation Failed

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Technologies Used

- **Angular 19** - Frontend framework
- **TypeScript** - Language with type safety
- **Angular Material** - UI components (Dialog)
- **Reactive Forms** - Form validation and handling
- **RxJS** - Reactive programming
- **CSS3** - Styling with gradients and animations

## 📦 Project Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build in watch mode
npm test           # Run unit tests
```

## 🔐 Security Notes

- Form inputs are validated on the client side
- Backend API should validate all inputs again
- CORS is configured to only allow requests from `http://localhost:4200`
- Never store sensitive data in localStorage without encryption

## 📞 Support

For issues or questions:
1. Check browser console for errors (F12 → Console tab)
2. Verify backend API is running and accessible
3. Ensure all dependencies are installed (`npm install`)
4. Clear browser cache and try again

## 📄 License

This project is part of the Candidate Interview Dashboard solution.
