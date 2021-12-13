import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @Auth()
  update(@User('id') id: number, @Body() dto: CreateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
