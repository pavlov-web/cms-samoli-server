import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { dtoErrors } from '../../../errors/dtoErrors.js';
import { IExpressRequest } from '../../../types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles.length) return true;

    const { user } = context.switchToHttp().getRequest<IExpressRequest>();
    if (!roles.includes(user.role)) {
      throw new ForbiddenException([dtoErrors.forbidden]);
    }

    return roles.includes(user.role);
  }
}
