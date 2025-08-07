import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { addBooks, deleteBook, getBookById, getBooks, getBooksByUser } from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.post("/add", addBooks);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/user/:id", getBooksByUser);
export default bookRouter;