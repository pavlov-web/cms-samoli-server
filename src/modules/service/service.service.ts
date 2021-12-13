import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errors } from '../../errors/messages.js';
import { titleToSlug } from '../../helpers';
import { Repository } from 'typeorm';
import { PortfolioService } from '../portfolio/portfolio.service.js';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceEntity } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repository: Repository<ServiceEntity>,
    @Inject(forwardRef(() => PortfolioService))
    private readonly portfolioService: PortfolioService,
  ) {}

  async create(dto: CreateServiceDto) {
    const service = new ServiceEntity();
    Object.assign(service, dto);
    service.slug = titleToSlug(service.title);
    return await this.save(service);
  }

  async update(id, dto: CreateServiceDto) {
    const service = await this.repository.findOne(id);
    if (!service) throw new NotFoundException([errors.notFound]);
    Object.assign(service, dto);
    service.slug = titleToSlug(service.title);
    return this.save(service);
  }

  async save(service: ServiceEntity) {
    service.slug = titleToSlug(service.title);
    service.portfolio = await this.portfolioService.findByIds(
      (service.portfolio as number[]) || [],
    );
    return await this.repository.save(service);
  }

  async findBySlug(slug: string) {
    return await this.repository.findOne(slug, { relations: ['portfolio'] });
  }

  async findByIds(ids: number[]) {
    return await this.repository.findByIds(ids);
  }

  async findAll() {
    return await this.repository.find({ relations: ['portfolio'] });
  }

  async delete(ids: number[]) {
    return await this.repository.delete(ids);
  }
}
