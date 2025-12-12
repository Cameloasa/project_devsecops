import app from './app.js';

// Start the server
const PORT = process.env.PORT || 3000;

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});