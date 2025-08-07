import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { addBooks, deleteBook, getBookById, getBooks, getBooksByUser } from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.post("/add",protectedRoute,addBooks);
bookRouter.get("/", protectedRoute,getBooks);
bookRouter.get("/:id", protectedRoute, getBookById);
bookRouter.delete("/:id", protectedRoute, deleteBook);
bookRouter.get("/user/:id", getBooksByUser);
export default bookRouter;