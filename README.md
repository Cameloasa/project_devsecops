# Project DevSecOps

Quiz App - Fullstack Project(Node backend + React frontend) with CI/CD Pipeline

## Features

- **REST API** for quiz questions management
- **CRUD Operations**: Create, Read, Update, Delete questions
- **React Frontend** with quiz interface
- **Automated Testing**: Unit tests, API tests, E2E tests
- **CI/CD Pipeline**: GitHub Actions with automated testing
- **Simple Authentication**: Admin-only operations with role-based access

### Prerequisites

- **Node.js** v24 or higher
- **npm** v10 or higher
- **Git**

## Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

1. Install dependencies:

    npm install

2. Start the server
    npm start

3. Backend server runs on
    - **URL:** [http://localhost:3000]
    - **API Endpoint (Questions):** [http://localhost:3000/api/questions]

4. For development with auto-reload:
    npm run dev

## Frontend Setup

### 1. Navigate to frontend folder

```bash
cd frontend
```

1. Install dependencies:

    npm install

2. Start the development server
    npm run dev

3. Frontend application
    - **URL:** [http://localhost:5173]
    - **Development server with hot reload**

4. For development with auto-reload:
    npm run dev

5. Build for production
    npm run build

## Tests

### Backend Tests

1. Unit tests(Vitest)
    cd backend
    npm test

2. API Tests (Newman/Postman)
    cd backend
    npm run test:api

## Frontend Tests

1. Unit tests(Vitest)
    cd frontend
    npm test

2. E2E tests (Playwright)
    cd frontend
    npm run test:api

### API Endpoints

GET /api/questions – get all questions - no auth required

GET /api/questions/:id – get a question by ID - no auth required

POST /api/questions – create a new question - auth required (x-role admin)

PATCH /api/questions/:id – update a question - auth required (x-role admin)

DELETE /api/questions/:id – delete a question - auth required (x-role admin)
