import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '../common/http-exceptions';

export class AuthorService {
  private readonly authorClient;

  constructor(prismaClient: PrismaClient) {
    this.authorClient = prismaClient.author;
  }

  async findOne(id: number) {
    const data = await this.authorClient.findUnique({ where: { id } });

    if (data === null) {
      throw new NotFoundException('Author not found');
    }

    return data;
  }
}
