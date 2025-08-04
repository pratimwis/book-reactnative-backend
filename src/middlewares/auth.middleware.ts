import { Request, Response, NextFunction } from "express";
import { NOT_FOUND, UNAUTHORIZED } from "../constant/http";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constant/appErrorCode";
import { catchErrors } from "../utils/catchErrors";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleware = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    appAssert(
      !token,
      UNAUTHORIZED,
      "Unauthorized access, please login to continue",
      AppErrorCode.Unauthorized
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    appAssert(
      !decoded,
      UNAUTHORIZED,
      "Invalid token",
      AppErrorCode.InvalidToken
    );
    const user = await User.findById((decoded as any).userId).select(
      "-password"
    );
    appAssert(!user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);
    req.user = user;
    next();
  }
);




export const protectedRoute = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] as string;
    appAssert(
      !token,
      UNAUTHORIZED,
      "Unauthorized access, please login to continue",
      AppErrorCode.Unauthorized
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    appAssert(
      !decoded,
      UNAUTHORIZED,
      "Invalid token",
      AppErrorCode.InvalidToken
    );
    const user = await User.findById((decoded as any).userId).select(
      "-password"
    );
    appAssert(!user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);
    req.user = user;
    next();
  }
);
