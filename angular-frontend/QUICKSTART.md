## Setup

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- Backend API running on `http://localhost:5000`

### Steps

**1. Install Dependencies** 
```bash
cd angular-frontend
npm install
```

**2. Start Development Server** 
```bash
npm start
```

**3. Open in Browser**
```
http://localhost:4200
```

## Backend Configuration

Ensure your backend:
- Is running on `http://localhost:5000` 
- Has the required database initialized
- API responds to these endpoints:
  - `GET /api/candidates`
  - `GET /api/candidates/summary`
  - `POST /api/candidates`

## Change Backend Port

Edit `src/app/services/candidate.service.ts`:
```typescript
private apiUrl = 'http://localhost:YOUR_PORT/api/candidates';
```
