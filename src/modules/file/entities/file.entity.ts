import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @CreateDateColumn()
  uploadAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.uploadAt = new Date();
  }
}
