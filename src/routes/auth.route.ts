import express from 'express';
import { checkAuth, signInController, signOutController, signUpController ,updateProfileController } from '../controllers/auth.controller';
import { authMiddleware, protectedRoute } from '../middlewares/auth.middleware';

const authRouter = express.Router();
authRouter.post('/signin',signInController)
authRouter.post('/signup',signUpController);
authRouter.post('/signout',signOutController);

authRouter.put('/update-profile',protectedRoute,updateProfileController);
authRouter.get('/check',protectedRoute,checkAuth)


export default authRouter;