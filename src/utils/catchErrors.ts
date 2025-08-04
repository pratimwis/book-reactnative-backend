
import { Request, Response, NextFunction } from "express";

// Define the type for an asynchronous controller function
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Define the catchErrors function to handle async errors
export const catchErrors = (controller: AsyncController): AsyncController => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);  
    } catch (error) {
      next(error);  
    }
  };
};
