import dotenv from ('dotenv');
import express from 'express';
import cors from 'cors';
import connectDB from './db';
import authRoutes from './routes/auth';
import privateRoutes from './routes/private';
import errorHandler from'./middleware/error';

const port = process.env.port || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

// Custom error error handler. Should be last middleware
app.use(errorHandler);

// Start server
const server = app.listen(port, () => console.log(`API is running on http://localhost:${port}`));

// Smooth server shut down on error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);// capture to log
  server.close(() => process.exit(1));// examine
})