import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { errors } from '../../errors/messages.js';
import { CreatePortfolioDto } from './dto/create-portfolio.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { DeleteResult, Repository } from 'typeorm';
import { titleToSlug } from '../../helpers';
import { ServiceService } from '../service/service.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly repository: Repository<PortfolioEntity>,
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService: ServiceService,
  ) {}

  async create(dto: CreatePortfolioDto): Promise<PortfolioEntity> {
    const portfolio = new PortfolioEntity();
    return await this.save(Object.assign(portfolio, dto));
  }

  async update(
    slug: string,
    dto: CreatePortfolioDto,
  ): Promise<PortfolioEntity> {
    const portfolio = await this.repository.findOne(slug);
    if (!portfolio) throw new NotFoundException([errors.notFound]);
    return await this.save(Object.assign(portfolio, dto));
  }

  async save(portfolio: PortfolioEntity): Promise<PortfolioEntity> {
    portfolio.slug = titleToSlug(portfolio.title);
    portfolio.services = await this.serviceService.findByIds(
      (portfolio.services as number[]) || [],
    );
    return await this.repository.save(portfolio);
  }

  async findBySlug(slug: string): Promise<PortfolioEntity> {
    return await this.repository.findOne(slug, { relations: ['services'] });
  }

  async findByIds(ids: number[]) {
    return await this.repository.findByIds(ids);
  }

  async findAll(): Promise<PortfolioEntity[]> {
    return await this.repository.find({ relations: ['services'] });
  }

  async delete(ids: number[]): Promise<DeleteResult> {
    return await this.repository.delete(ids);
  }
}
