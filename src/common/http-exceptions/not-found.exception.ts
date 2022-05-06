import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message: unknown, stack?: unknown) {
    super(404, 'Not Found', message, stack);
  }
}
