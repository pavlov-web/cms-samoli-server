import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IExpressRequest } from 'src/types';
import { UserService } from '../../user/user.service.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      req.user = null;
      next();
      return;
    }

    try {
      const token = req.cookies.token;
      const decode: JwtPayload = verify(token, 'secret');
      req.user = await this.userService.findById(decode.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
