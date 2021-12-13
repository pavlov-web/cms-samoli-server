import { Request } from 'express';
import { UserEntity } from 'src/modules/user/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity;
}

export enum UserRole {
  'ADMIN' = 'admin',
  'DIRECTOR' = 'director',
  'MANAGER' = 'manager',
  'EMPLOYEE' = 'employee',
}
