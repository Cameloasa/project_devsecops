# Project DevSecOps

Fullstack project with Node backend + React frontend + CI/CD pipeline.

## Backend

### Requirements

- Node.js v24+
- npm

### Setup

1. Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

npm install

Running the server
npm start

Server runs on http://localhost:3000.

Running tests
npm run test

Unit tests are in tests/unit.

API Endpoints

GET /api/questions – get all questions

GET /api/questions/:id – get a question by ID

POST /api/questions – create a new question

PUT /api/questions/:id – update a question

DELETE /api/questions/:id – delete a question