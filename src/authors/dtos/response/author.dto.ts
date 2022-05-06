import { Expose } from 'class-transformer';

export class AuthorDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;
}
