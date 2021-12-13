import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/types';
import { AuthGuard } from '../guards/auth.guard.js';
import { RoleGuard } from '../guards/role.guard.js';

export const Auth = (...roles: UserRole[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
};
