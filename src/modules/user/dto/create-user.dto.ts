import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { dtoErrors } from '../../../errors/dtoErrors.js';

export class CreateUserDto {
  @IsNotEmpty({ message: dtoErrors.isEmpty })
  firstName: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  lastName: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  @IsEmail({}, { message: dtoErrors.invalidEmail })
  email: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  @MinLength(6, { message: dtoErrors.minLength })
  password: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  position: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  role: string;
}
