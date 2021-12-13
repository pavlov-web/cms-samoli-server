import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { errors } from '../../errors/messages.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const isExist = await this.repository.findOne({ email: dto.email });

    if (isExist) {
      throw new BadRequestException(errors.emailExist);
    }

    const user = Object.assign(new UserEntity(), dto);
    return this.repository.save(user);
  }

  async update(id: number, dto: CreateUserDto) {
    const user = await this.repository.findOne(id);
    Object.assign(user, dto);
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ email });
  }

  async findById(id: number) {
    return await this.repository.findOne(id);
  }

  async findAll() {
    return await this.repository.find();
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
