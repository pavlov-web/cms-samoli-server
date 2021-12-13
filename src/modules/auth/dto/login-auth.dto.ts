import { IsEmail, IsNotEmpty } from 'class-validator';
import { dtoErrors } from '../../../errors/dtoErrors.js';

export class LoginAuthDto {
  @IsEmail({}, { message: dtoErrors.invalidEmail })
  email: string;

  @IsNotEmpty({ message: dtoErrors.isEmpty })
  password: string;
}
