import express from 'express';
import questionsRoutes from './routes/questions.routes.js'; 

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the questions routes
app.use('/api/questions', questionsRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;