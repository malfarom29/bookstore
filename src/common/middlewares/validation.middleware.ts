import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../http-exceptions';

export function validationMiddleware<T>(dto: ClassType<T>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const params = plainToClass(dto, body);
    const errors = await validate(params as unknown as Record<string, unknown>);

    if (errors.length > 0) {
      return res.status(422).json({
        error: 'Unprocessable Entity',
        message: errors
          .map(({ constraints }) => {
            if (typeof constraints === 'object') {
              return Object.values(constraints);
            }
          })
          .flat(),
      });
    }

    next();
  };
}
