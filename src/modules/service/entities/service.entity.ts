import { PortfolioEntity } from '../../portfolio/entities/portfolio.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  price: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  content: string;

  @Column({ default: '' })
  description: string;

  @ManyToMany(() => PortfolioEntity, (portfolio) => portfolio.services)
  portfolio: PortfolioEntity[] | number[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }
}
