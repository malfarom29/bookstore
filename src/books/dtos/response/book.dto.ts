import { Author } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { AuthorDto } from '../../../authors/dtos/response/author.dto';

export class BookDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  @Type(() => AuthorDto)
  readonly author: Author;
}
