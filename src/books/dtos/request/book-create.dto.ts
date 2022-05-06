import { IsNumber, IsString } from "class-validator";

export class BookCreateDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly authorId: number;
}