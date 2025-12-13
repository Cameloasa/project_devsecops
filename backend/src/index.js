import app from './app.js';

/* global process */
const PORT = process.env.PORT || 3000;

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});