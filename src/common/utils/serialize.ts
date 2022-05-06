import { instanceToInstance, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';
import 'reflect-metadata';

export function serialize<T>(dto: ClassType<T>, data: unknown[]): T[];
export function serialize<T>(dto: ClassType<T>, data: unknown): T;
export function serialize<T>(dto: ClassType<T>, data: any): any {
  if (Array.isArray(data)) {
    return data.map((d) =>
      instanceToInstance(
        plainToClass(dto, d, { excludeExtraneousValues: true }),
      ),
    );
  }

  return instanceToInstance(
    plainToClass(dto, data, { excludeExtraneousValues: true }),
  );
}
