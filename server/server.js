import "dotenv/config.js";
// import dotenv from 'dotenv';
// dotenv.config();
// require('')
// import { config } from "dotenv";
// config({ path: process.ENV })
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRouter from './routes/auth.js';
import privateRouter from './routes/private.js';
import errorHandler from'./middleware/error.js';

const port = process.env.port || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/private', privateRouter);

// Custom error error handler. Should be last middleware
app.use(errorHandler);

// Start server
const server = app.listen(port, () => console.log(`API is running on http://localhost:${port}`));

// Smooth server shut down on error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);// capture to log
  server.close(() => process.exit(1));// examine
})