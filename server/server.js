require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const errorHandler = require('./middleware/error');

const port = process.env.port || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/private", require('./routes/private'));

// Custom error error handler. Should be last middleware
app.use(errorHandler);

// Start server
const server = app.listen(port, () => console.log(`API is running on http://localhost:${port}`));

// Smooth server shut down on error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);// capture to log
  server.close(() => process.exit(1));// examine
})