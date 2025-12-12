import express from 'express';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;