## Overview

- **Frontend**: Angular 19 
- **Backend**: ASP.NET 9 Core Web API
- **Database**: SQLite

## 📂 Project Structure

```
Candidate Interview Dashboard/
├── (Backend - ASP.NET 9)
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
└── angular-frontend/ (NEW)
    ├── src/
    ├── package.json
    ├── angular.json
    └── README.md
```

## 🔧 Prerequisites

### Required
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **.NET 9 SDK** ([Download](https://dotnet.microsoft.com/download/dotnet/9.0))

## 🎯 Step-by-Step Setup

### STEP 1: Backend Setup (ASP.NET 9)

If you haven't already set up the backend:

#### 1.1 Restore Dependencies
```bash
cd "Candidate Interview Dashboard"
dotnet restore
```

#### 1.2 Initialize Database
```bash
dotnet ef database update
```

This creates the SQLite database (`Candidates.db`).

#### 1.3 Run Backend API
```bash
dotnet run
```

**Backend runs at**: `http://localhost:5000`

✅ Verify it's working: Open `http://localhost:5000/api/candidates` in browser

---

### STEP 2: Frontend Setup (Angular)

#### 2.1 Navigate to Frontend Directory
```bash
cd angular-frontend
```

#### 2.2 Install Dependencies
```bash
npm install
```

Takes 2-3 minutes. This installs:
- Angular framework
- Angular Material
- RxJS
- TypeScript
- And other dependencies

#### 2.3 Start Development Server
```bash
npm start
```

Or use Angular CLI:
```bash
ng serve
```

**Frontend runs at**: `http://localhost:4200`

---

### STEP 3: Verify Everything Works

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd "Candidate Interview Dashboard"
dotnet run
# Should show: Application started. Press Ctrl+C to shut down.
```

**Terminal 2 - Frontend:**
```bash
cd "Candidate Interview Dashboard/angular-frontend"
npm start
# Should show: Application bundle generated successfully.
```

### STEP 4: Test the Application

1. Open browser: `http://localhost:4200`
2. **Dashboard page** - Should show 0 candidates initially
3. **Add Candidate** - Click button and fill form
4. **Form validation** - Leave required fields empty, submit button stays disabled
5. **Submit** - Click submit with valid data
6. **Success** - Should redirect to candidates list
7. **View Modal** - Click "View" on a candidate to see details in modal

✅ Everything working? Great! Your app is ready.

---

## 📖 Application Features

### 🏠 Dashboard (`http://localhost:4200`)
- Displays 3 stat cards:
  - Total Candidates
  - Hired
  - Rejected
- Quick navigation buttons

### ➕ Add Candidate (`http://localhost:4200/create`)
- Form with validation
- Required fields: First Name, Last Name, Email
- Additional fields: Cellphone, Job Role, Status
- Real-time error messages
- Auto-redirect on success

### 📋 Candidate List (`http://localhost:4200/list`)
- Table view of all candidates
- Column: ID, First Name, Last Name, Email, Job Role, Status
- View button for each row
- Color-coded status badges

### 🔍 Candidate Details (Modal)
- Click "View" to open modal
- Shows complete information
- Close with Escape or click outside

---

## 🔌 API Endpoints Reference

### Base URL
```
http://localhost:5000/api/candidates
```

### 1. Get All Candidates
```
GET /api/candidates
Response: Candidate[]
```

### 2. Get Summary Stats
```
GET /api/candidates/summary
Response: {
  "total": 5,
  "hired": 2,
  "rejected": 1
}
```

### 3. Create New Candidate
```
POST /api/candidates
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "cellphone": 1234567890,
  "status": "Pending",
  "jobRole": "Senior Developer"
}

Response: Candidate (with ID)
```

---

## 🔧 Configuration

### Change Backend Port

If backend runs on different port (not 5000):

Edit: `angular-frontend/src/app/services/candidate.service.ts`
```typescript
private apiUrl = 'http://localhost:YOUR_PORT/api/candidates';
```

### Change Frontend Port

If port 4200 is in use:
```bash
ng serve --port 4300
```

---

## 📊 Database Schema

### Candidates Table
```sql
CREATE TABLE Candidates (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FirstName TEXT NOT NULL,
  LastName TEXT NOT NULL,
  Email TEXT NOT NULL,
  Cellphone INTEGER NOT NULL,
  Status TEXT NOT NULL DEFAULT 'Pending',
  JobRole TEXT NOT NULL
)
```

**Status values**: Pending, Interviewing, Hired, Rejected

---

## 🧪 Testing the Application

### Test 1: Create Candidate
1. Go to `/create`
2. Fill form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Cellphone: 5551234567
   - Job Role: Software Engineer
3. Click Submit
4. Should see success message and redirect to list

### Test 2: Validation
1. Go to `/create`
2. Try clicking Submit with empty fields
3. Button should be disabled
4. See error messages for each field

### Test 3: View Modal
1. Go to `/list`
2. Click "View" on any candidate
3. Modal should open with details
4. Press Escape to close

### Test 4: Dashboard Stats
1. Go to `/` (home)
2. Should see updated total candidate count
3. Reflects data from `/api/candidates/summary`

---

## 📁 Key Files

### Backend Files
| File | Purpose |
|------|---------|
| `Program.cs` | App configuration, CORS setup |
| `Controllers/CandidatesController.cs` | API endpoints |
| `Models/Candidate.cs` | Data model |
| `Data/AppDbContext.cs` | Database context |
| `Migrations/` | Database schema versions |

### Frontend Files
| File | Purpose |
|------|---------|
| `src/app/services/candidate.service.ts` | API communication |
| `src/app/app.routes.ts` | Route definitions |
| `src/app/components/dashboard/` | Home page |
| `src/app/components/add-candidate/` | Form |
| `src/app/components/candidate-list/` | Table view |
| `src/app/components/candidate-detail-dialog/` | Modal |

---

## 🚨 Troubleshooting

### Issue: Backend won't start
```
Error: Address already in use
```
**Solution**: Kill process on port 5000 or use different port

### Issue: Frontend won't connect to API
```
ERR_BLOCKED_BY_CLIENT
```
**Solution**: 
1. Verify backend is running
2. Check API URL in `candidate.service.ts`
3. Verify CORS is enabled (it is in your backend)

### Issue: Form submission fails
**Solution**:
1. Check browser console (F12 → Console)
2. Verify API endpoint responds: `http://localhost:5000/api/candidates`
3. Check cellphone field has only numbers

### Issue: Port already in use
```
To change port: ng serve --port 4300
Or for backend: dotnet run --urls "http://localhost:5050"
```

### Issue: npm install fails
```bash
npm install --legacy-peer-deps
```

---

## 🔐 CORS & Security

### CORS Configuration (Backend)
Already configured in `Program.cs`:
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

⚠️ **For production**: Change to your domain
```csharp
policy.WithOrigins("https://yourdomain.com")
```

### Form Validation
- **Frontend**: Real-time validation with error messages
- **Backend**: Validates ModelState in controller
- **Best practice**: Always validate on both sides

---

## 📦 Deployment Checklist

### Before Deploying

- [ ] Backend tests pass
- [ ] Frontend builds without errors: `npm run build`
- [ ] All validation works correctly
- [ ] Modal opens/closes properly
- [ ] Database backup created
- [ ] Environment variables configured

### Production Build

**Backend:**
```bash
dotnet publish -c Release
```

**Frontend:**
```bash
npm run build
```

Output in `dist/candidate-interview-frontend/`

### Deployment Targets

**Backend (ASP.NET Core):**
- Azure App Service
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Self-hosted server

**Frontend (Angular):**
- GitHub Pages (free)
- Netlify (free with custom domain)
- Vercel (free)
- Azure Static Web Apps
- AWS S3 + CloudFront
- Any web server (nginx, Apache)

---

## 🎓 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Angular Frontend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │  Add Form    │  │  List        │  │
│  │  (stat cards)│  │  (validation)│  │  (table)     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                  │                  │          │
│         └──────────────────┼──────────────────┘          │
│                            │                             │
│                    ┌───────▼────────┐                   │
│                    │ Candidate      │                   │
│                    │ Service        │                   │
│                    │ (HTTP Client)  │                   │
│                    └───────┬────────┘                   │
└─────────────────────────────┼─────────────────────────────┘
                              │ HTTP Requests
┌─────────────────────────────┼─────────────────────────────┐
│                             │  ASP.NET Backend             │
│                    ┌────────▼────────┐                   │
│                    │ CandidatesCtrl  │                   │
│                    │ - GetCandidates │                   │
│                    │ - GetSummary    │                   │
│                    │ - PostCandidate │                   │
│                    └────────┬────────┘                   │
│                             │                             │
│                    ┌────────▼────────┐                   │
│                    │  AppDbContext   │                   │
│                    │  (Entity Fw)    │                   │
│                    └────────┬────────┘                   │
│                             │                             │
│                    ┌────────▼────────┐                   │
│                    │  SQLite DB      │                   │
│                    │ (Candidates.db) │                   │
│                    └─────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Commands Reference

### Backend (ASP.NET)
```bash
cd "Candidate Interview Dashboard"
dotnet restore         # Install dependencies
dotnet ef database update  # Create/migrate database
dotnet run             # Start development server
dotnet publish -c Release  # Build for production
```

### Frontend (Angular)
```bash
cd "Candidate Interview Dashboard/angular-frontend"
npm install            # Install dependencies
npm start              # Start dev server
npm run build          # Build for production
npm run watch          # Watch mode
ng serve --port 4300   # Run on different port
```

---