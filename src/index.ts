import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import booksRouter from './books/books.routes';
import { HttpException } from './common/http-exceptions';
import { BookService } from './books/book.service';
import { AuthorService } from './authors/author.service';
config();

const app = express();
const server = createServer(app);
const port = process.env.PORT;
const io = new Server(server);

// Services Initialization
const prismaClient = new PrismaClient();
const authorService = new AuthorService(prismaClient);
const bookService = new BookService(prismaClient, authorService);

function errorHandler(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, error, message, stack } = err;

  return res.status(status).json({ error, message, stack });
}

io.of('/books/csv').on('connection', async (socket) => {
  console.log('connection to /books/csv established');
  const csv = await bookService.csv();
  socket.emit('csv:generate', csv);
});

app.use(bodyParser.json());
app.use('/books', booksRouter(bookService));

app.get('/', (_req, res) => {
  res.send('Hello world!');
});

app.use(errorHandler);

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
