import { forwardRef, Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module.js';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity]),
    forwardRef(() => ServiceModule),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
