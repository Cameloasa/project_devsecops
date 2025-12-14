import express from 'express';
import questionsRoutes from './routes/questions.routes.js'; 
import { adminOnly } from './admin/admin.js';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the questions routes
app.use('/api/questions', questionsRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running in dev mode and is up!');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;