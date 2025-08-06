import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, res: Response) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 hour
  });
  return accessToken;
};

export const generateRefreshToken = (userId: string, res: Response) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return refreshToken;
};
