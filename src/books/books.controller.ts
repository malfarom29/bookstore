import { NextFunction, Request, Response } from 'express';
import { serialize } from '../common/utils';
import { BookService } from './book.service';
import { BookDto } from './dtos/response/book.dto';

export default (bookService: BookService) => ({
  createBook: async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      const data = await bookService.create(body);

      return res.status(201).json({ data: serialize(BookDto, data) });
    } catch (err) {
      next(err);
    }
  },
  findAllBooks: async (_req: Request, res: Response) => {
    const data = await bookService.findAll();

    return res.status(200).json({ data: serialize(BookDto, data) });
  },
  findOne: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;

    try {
      const data = await bookService.findOne(Number(id));

      return res.status(200).json({ data: serialize(BookDto, data) });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;

    try {
      await bookService.delete(Number(id));

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
});
