import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { errors } from '../../errors/messages.js';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

export interface IUserResponse
  extends Omit<UserEntity, 'updateTimestamp' | 'toJSON'> {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(dto: LoginAuthDto): Promise<IUserResponse> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException([errors.invalidLogin]);
    }

    const isPasswordCorrect = await compare(dto.password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new BadRequestException([errors.invalidPassword]);
    }

    return this.buildUserResponse(user);
  }

  async register(dto): Promise<IUserResponse> {
    const { password, ...res } = dto;
    const hashPassword = await hash(password, 10);

    const user = await this.userService.create({
      password: hashPassword,
      ...res,
    });
    return this.buildUserResponse(user);
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    const token = sign({ id: user.id, email: user.email }, 'secret', {
      expiresIn: '30d',
    });
    delete user.password;
    return { token, ...user };
  }
}
