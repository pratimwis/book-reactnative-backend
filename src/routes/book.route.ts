import { Router } from "express";
import { authMiddleware, protectedRoute } from "../middlewares/auth.middleware";
import { addBooks, getBooks } from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.post("/add",protectedRoute,addBooks);
bookRouter.get("/", authMiddleware,getBooks);
export default bookRouter;