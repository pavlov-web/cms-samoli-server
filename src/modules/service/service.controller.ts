import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
  @Auth()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Patch('/update/:id')
  @Auth()
  update(@Param() id: number, @Body() dto: CreateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @Delete('delete')
  @Auth()
  delete(@Body('ids') ids: number[]) {
    return this.serviceService.delete(ids);
  }

  @Get('all')
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param() slug: string) {
    return this.serviceService.findBySlug(slug);
  }
}
