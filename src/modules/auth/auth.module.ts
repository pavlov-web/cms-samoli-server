import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { AuthGuard } from './guards/auth.guard.js';
import { RoleGuard } from './guards/role.guard.js';

@Module({
  imports: [TypeOrmModule.forFeature(), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
})
export class AuthModule {}
