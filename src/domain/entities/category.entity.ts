import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commerce } from './commerce.entity';

@Entity({ name: 'Categories' })
export class Category {
  @PrimaryGeneratedColumn()
  CategoryId: number;

  @Column()
  CommerceId: number;

  @Column()
  Name: string;

  @ManyToOne(() => Commerce, (commerce) => commerce.Categories)
  @JoinColumn({ name: 'CommerceId' })
  Commerce: Commerce;
}
