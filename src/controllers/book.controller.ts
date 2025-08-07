import AppErrorCode from '../constant/appErrorCode';
import { Request, Response } from 'express';
import { BAD_REQUEST, NOT_FOUND, OK } from '../constant/http';
import cloudinary from '../lib/cloudinary';
import Book from '../models/book.model';
import appAssert from '../utils/appAssert';
import { catchErrors } from '../utils/catchErrors';
import mongoose from 'mongoose';

export const addBooks = catchErrors(async (req: Request, res: Response) => {
  const { title, caption, rating, image, price } = req.body;
  appAssert(
    !title || !caption || !rating || !image || !price,
    BAD_REQUEST,
    'All fields are required',
    AppErrorCode.MissingField
  );
  //upload the image in cloudinary
  const uploadedResponse = (await cloudinary.uploader.upload(image)) as {
    secure_url?: string;
  };
  appAssert(
    !uploadedResponse || !uploadedResponse.secure_url,
    BAD_REQUEST,
    'Failed to upload profile picture',
    AppErrorCode.UploadFailed
  );
  const book = new Book({
    title,
    caption,
    rating,
    price,
    image: uploadedResponse.secure_url,
    createBy: (req as any).user._id,
  });
  await book.save();

  res.status(OK).json({ message: 'The book is created', success: true });
});

//form frontent coming like that - const response  = await fetch("http://localhost:5000/api/books?page=1&limit=5")
export const getBooks = catchErrors(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const books = await Book.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('createBy', 'fname lname profilePicture');

  const totalBooks = await Book.countDocuments();
  res.status(OK).json({
    books,
    currentPage: page,
    totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
    message: 'Books fetched successfully',
    success: true,
  });
});

export const getBookById = catchErrors(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  appAssert(
    !bookId,
    BAD_REQUEST,
    'Book ID is required',
    AppErrorCode.MissingField
  );
  const book = await Book.findById(bookId).populate(
    'createBy',
    'fname lname profilePicture'
  );
  appAssert(!book, NOT_FOUND, 'Book not found', AppErrorCode.BookNotFound);
  res
    .status(OK)
    .json({ book, message: 'Book fetched successfully', success: true });
});

export const deleteBook = catchErrors(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  appAssert(
    !bookId,
    BAD_REQUEST,
    'Book ID is required',
    AppErrorCode.MissingField
  );
  const book = await Book.findById(bookId);
  appAssert(
    req.user._id.toString() !== book?.createBy.toString(),
    BAD_REQUEST,
    'You are not authorized to delete this book',
    AppErrorCode.AccessDenied
  );
  //delete the image in cloudinary
  //https://res.cloudinary.com/dzvdidshd/image/upload/v1709900000/sample.jpg
  if(book?.image && book.image.includes('cloudinary')) {
     try {
      const publicId = book.image.split('/').pop()?.split('.')[0];// it return only   sample.jpg
      await cloudinary.uploader.destroy(publicId as string);
     } catch (deleteError) {
      console.error('Error deleting image from Cloudinary:', deleteError);
     }
  }
  await book?.deleteOne();

  appAssert(!book, NOT_FOUND, 'Book not found', AppErrorCode.BookNotFound);
  res.status(OK).json({ message: 'Book deleted successfully', success: true });
});

//Get all books of user

export const getBooksByUser = catchErrors(
  async (req: Request, res: Response) => {
    //convert id to mongoose ObjectId
    console.log('User ID:', req.params.id);
    appAssert(
      !req.params.id,
      BAD_REQUEST,
      'User ID is required',
      AppErrorCode.UserIdRequired
    );
    const books = await Book.find({ createBy: req.params.id })
      .sort({ createdAt: -1 })
      .populate('createBy', 'fname lname profilePicture');
    appAssert(
      books.length === 0,
      NOT_FOUND,  
      'No books found for this user',
      AppErrorCode.BookNotFound
    );
    res.status(OK).json({
      books,
      message: 'Books fetched successfully',
      success: true,
    });
  }
);