import { Request, Response } from 'express';
import AppErrorCode from '../constant/appErrorCode';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constant/http';
import User from '../models/user.model';
import appAssert from '../utils/appAssert';
import { catchErrors } from '../utils/catchErrors';
import bcryptjs from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtToken';
import cloudinary from '../lib/cloudinary';

export const signUpController = catchErrors(
  async (req: Request, res: Response) => {
    const { username, email, password, userType } = req.body;

    appAssert(
      !username || !email || !password || !userType,
      BAD_REQUEST,
      'All fields are required',
      AppErrorCode.MissingField
    );
    appAssert(
      password.length < 6,
      BAD_REQUEST,
      'Password must be at least 6 characters',
      AppErrorCode.InvalidPassword
    );

    const existingUser = await User.findOne({ email });
    appAssert(
      existingUser,
      BAD_REQUEST,
      'User already exists',
      AppErrorCode.UserAlreadyExists
    );

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      userType,
    });

    await newUser.save();

   
    const accessToken = generateAccessToken(newUser._id.toString(), res);
    const refreshToken = generateRefreshToken(newUser._id.toString(), res);

    res.status(CREATED).json({
      message: newUser.userType === 'buyer' ? 'Welcome to user dashboard' : 'Welcome to seller dashboard',
      success: true,
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
);

export const signInController = catchErrors(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    appAssert(
      !email || !password,
      BAD_REQUEST,
      'All fields are required',
      AppErrorCode.MissingField
    );

    const user = await User.findOne({ email });
    if (!user) {
      appAssert(
        false,
        NOT_FOUND,
        'User does not exist',
        AppErrorCode.UserNotFound
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user!.password);
    appAssert(
      !isPasswordMatch,
      BAD_REQUEST,
      'Password is incorrect',
      AppErrorCode.PasswordMismatch
    );

    const userType = user.userType || 'buyer';
    let message = '';
    if (userType == 'buyer') {
      message = 'Welcome to user dashboard';
    } else {
      message = 'Welcome to seller dashboard';
    }
    const accessToken = generateAccessToken(user._id.toString(), res);
    const refreshToken = generateRefreshToken(user._id.toString(), res);
    res
      .status(OK)
      .json({
        message: message,
        success: true,
        user,
        accessToken,
        refreshToken,
      });
  }
);

export const signOutController = catchErrors(
  async (_req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(OK).json({ message: 'Sign out successful', success: true });
  }
);

export const updateProfileController = catchErrors(
  async (req: Request, res: Response) => {
    const { profilePicture }: { profilePicture: string } = req.body;

    appAssert(
      !profilePicture,
      BAD_REQUEST,
      'Profile picture is required',
      AppErrorCode.MissingField
    );

    const uploadedResponse = (await cloudinary.uploader.upload(
      profilePicture
    )) as { secure_url?: string };
    appAssert(
      !uploadedResponse || !uploadedResponse.secure_url,
      BAD_REQUEST,
      'Failed to upload profile picture',
      AppErrorCode.UploadFailed
    );

    const userId = (req as any).user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadedResponse.secure_url },
      { new: true, runValidators: true }
    );

    res.status(OK).json({
      message: 'Profile updated successfully',
      success: true,
      user,
    });
  }
);

export const checkAuth = catchErrors(async (req: Request, res: Response) => {
  const user = (req as any).user;

  appAssert(!user, NOT_FOUND, 'User not found', AppErrorCode.UserNotFound);

  res.status(OK).json({
    message: 'User is authenticated',
    success: true,
    user,
  });
});
