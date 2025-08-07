import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
import authRouter from './routes/auth.route';
import AppError from './utils/appError';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import bookRouter from './routes/book.route';
import job from './lib/cronJob';  
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieparser());
app.use(cors({ origin: "*" }));
job.start();  // Start the cron job

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);

// Global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    console.log(`Error: ${err.message}`);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.errorCode || 'UNKNOWN_ERROR',
    });
    return;
  }
  console.error('Unexpected error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running at http://localhost:${PORT}`);
});
