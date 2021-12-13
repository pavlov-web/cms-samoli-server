import { ServiceEntity } from '../../service/entities/service.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ array: true, default: [] })
  gallery: string;

  @Column({ default: '' })
  after_photo: string;

  @Column({ default: '' })
  before_photo: string;

  @Column({ default: '' })
  content: string;

  @Column({ array: true, default: [] })
  video: string;

  @Column({ array: true, default: [] })
  review: string;

  @Column({ array: true, default: [] })
  category: string;

  @Column({ array: true, default: [] })
  fabric: string;

  @ManyToMany(() => ServiceEntity, (service) => service.portfolio)
  @JoinTable()
  services: ServiceEntity[] | number[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }
}
