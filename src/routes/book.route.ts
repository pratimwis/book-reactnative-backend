import { Router } from "express";
import { authMiddleware, protectedRoute } from "../middlewares/auth.middleware";
import { addBooks } from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.post("/add",protectedRoute,addBooks)