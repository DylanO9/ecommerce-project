const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users'); // Import the users routes
const authRouter = require('./routes/auth'); // Import the auth routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // To enable CORS
app.use(bodyParser.json()); // To parse incoming JSON requests

// Use routes
app.use('/api/users', usersRouter); // All routes in users.js are now prefixed with /api/users
app.use('/api/users', authRouter); // All routes in auth.js are now prefixed with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
