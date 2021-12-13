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
import { CreatePortfolioDto } from './dto/create-portfolio.dto.js';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  @Auth()
  create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Patch('/update/:slug')
  @Auth()
  update(@Param() slug: string, @Body() dto: CreatePortfolioDto) {
    return this.portfolioService.update(slug, dto);
  }

  @Delete('delete')
  @Auth()
  delete(@Body('ids') ids: number[]) {
    return this.portfolioService.delete(ids);
  }

  @Get('all')
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param() slug: string) {
    return this.portfolioService.findBySlug(slug);
  }
}
