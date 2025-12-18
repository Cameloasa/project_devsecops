# Project DevSecOps

Quiz App - Fullstack Project(Node backend + React frontend) with CI/CD Pipeline

## Features

- **REST API** for quiz questions management
- **CRUD Operations**: Create, Read, Update, Delete questions
- **Automated Testing**: Unit tests, API tests, E2E tests
- **CI/CD Pipeline**: GitHub Actions with automated testing
- **Simple Authentication**: Admin-only operations with role-based access

### Prerequisites

- **Node.js** v24 or higher
- **npm** v10 or higher
- **Git**

### Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

1. Install dependencies:

    npm install

2. Start the server
    npm start

    Server runs on http://localhost:3000

3. For development with auto-reload:
    npm run dev

### Tests

1. Unit tests(Vitest)
    npm test

2. API Tests (Newman/Postman)
    npm run test:api

### API Endpoints

GET /api/questions – get all questions - no auth required

GET /api/questions/:id – get a question by ID - no auth required

POST /api/questions – create a new question - auth required

PATCH /api/questions/:id – update a question - auth required

DELETE /api/questions/:id – delete a question - auth require
