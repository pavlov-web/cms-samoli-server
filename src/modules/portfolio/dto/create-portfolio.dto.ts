import { IsNotEmpty, IsOptional } from 'class-validator';
import { dtoErrors } from '../../../errors/dtoErrors.js';

export class CreatePortfolioDto {
  @IsNotEmpty({ message: dtoErrors.isEmpty })
  readonly title: string;

  @IsOptional()
  readonly services: number[];

  @IsOptional()
  readonly gallery: string[];

  @IsOptional()
  readonly after_photo: string;

  @IsOptional()
  readonly before_photo: string;

  @IsOptional()
  readonly content: string;

  @IsOptional()
  readonly video: string;

  @IsOptional()
  review: string[];

  @IsOptional()
  category: string[];

  @IsOptional()
  fabric: string[];
}
