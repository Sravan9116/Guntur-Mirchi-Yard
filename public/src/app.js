require('dotenv').config({ path: __dirname + '/../.env' });
console.log('JWT Secret:', process.env.JWT_SECRET);

const express = require('express');
const cors = require('cors');
const userRoutes = require('./route/userRoutes'); // Ensure correct path and filename
const path = require('path');
const ngrok = require('ngrok');

const app = express();

// Add CORS middleware
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes with a proper API base path
app.use('/api/users', userRoutes); // API base path for user-related routes

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


const port = process.env.PORT || 3001; // Use port from .env or fallback to 3001

// Start the server and integrate ngrok
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    const url = await ngrok.connect(port);  // This will connect your local server to ngrok
    console.log(`Your server is publicly accessible at ${url}`);
  } catch (error) {
    console.error('Error connecting ngrok:', error);
  }
});
