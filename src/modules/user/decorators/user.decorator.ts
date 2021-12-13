import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from '../../../types';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest<IExpressRequest>();
  if (!user) return null;
  if (data) return user[data];
  return user;
});
