import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  position: string;

  @Column({ default: 'employee' })
  role: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }

  toJSON() {
    return classToPlain(this);
  }
}
