import { forwardRef, Module } from '@nestjs/common';
import { PortfolioModule } from '../portfolio/portfolio.module.js';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity]),
    forwardRef(() => PortfolioModule),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
