export class HttpException {
  readonly status: number;
  readonly error: string | undefined;
  readonly message: unknown;
  readonly stack: unknown;

  constructor(
    status: number,
    error?: string,
    message?: unknown,
    stack?: unknown,
  ) {
    this.status = status;
    this.error = error;
    this.message = message;
    this.stack = stack;
  }
}
