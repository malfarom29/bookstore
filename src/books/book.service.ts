import { Book, PrismaClient } from '@prisma/client';
import { Parser } from 'json2csv';
import { BookCreateDto } from './dtos/request/book-create.dto';
import { AuthorService } from '../authors/author.service';
import { NotFoundException } from '../common/http-exceptions';

export class BookService {
  private readonly bookClient;
  private readonly parser: Parser<Book | Book[]>;
  constructor(
    prismaClient: PrismaClient,
    private readonly authorService: AuthorService,
  ) {
    this.bookClient = prismaClient.book;
    this.parser = new Parser();
  }

  async create(params: BookCreateDto): Promise<Book> {
    await this.authorService.findOne(params.authorId);

    return this.bookClient.create({
      data: params,
      include: { author: true },
    });
  }

  async findAll(): Promise<Book[]> {
    return this.bookClient.findMany();
  }

  async findOne(id: number): Promise<Book> {
    const data = await this.bookClient.findUnique({
      where: { id },
      include: { author: true },
    });

    if (data === null) {
      throw new NotFoundException('Book not found');
    }

    return data;
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.bookClient.delete({ where: { id } });
  }

  async csv() {
    const books = await this.findAll();
    return this.parser.parse(books);
  }
}
