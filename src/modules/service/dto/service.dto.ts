import { IsNotEmpty, IsOptional } from 'class-validator';
import { dtoErrors } from '../../../errors/dtoErrors.js';

export class CreateServiceDto {
  @IsNotEmpty({ message: dtoErrors.isEmpty })
  readonly title: string;

  @IsOptional()
  readonly price: string;

  @IsOptional()
  readonly image: string;

  @IsOptional()
  readonly content: string;

  @IsOptional()
  readonly description: string;
}
