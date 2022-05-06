import { Router } from 'express';
import { validationMiddleware } from '../common/middlewares/validation.middleware';
import { BookService } from './book.service';
import BooksController from './books.controller';
import { BookCreateDto } from './dtos/request/book-create.dto';

export default (bookService: BookService) => {
  const router = Router();
  const booksController = BooksController(bookService);

  router.route('').get(booksController.findAllBooks);
  router.route('/:id').get(booksController.findOne);
  router.route('/:id').delete(booksController.delete);
  router
    .route('')
    .post(validationMiddleware(BookCreateDto), booksController.createBook);

  return router;
};
