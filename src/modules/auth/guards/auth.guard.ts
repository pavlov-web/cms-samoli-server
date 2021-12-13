import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { dtoErrors } from '../../../errors/dtoErrors.js';
import { IExpressRequest } from '../../../types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();
    if (request.user) return true;
    throw new UnauthorizedException(dtoErrors.unauthorized);
  }
}
