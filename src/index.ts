import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
import authRouter from './routes/auth.route';
import AppError from './utils/appError';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import job from './lib/cronJob';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

job.start();
app.use('/api/auth', authRouter);

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
const PORT = process.env.PORT ? Number(process.env.PORT) : 8001;

app.listen(PORT,'0.0.0.0', () => {
  connectToDatabase();
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
