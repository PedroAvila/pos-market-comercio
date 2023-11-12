import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commerce } from './commerce.entity';
import { Category } from './category.entity';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  ProductId: number;

  @Column()
  CommerceId: number;

  @Column()
  CategoryId: number;

  @Column()
  Name: string;

  @Column({ type: 'decimal' })
  Price: number;

  @ManyToOne(() => Commerce, (commerce) => commerce.Products)
  @JoinColumn({ name: 'CommerceId' })
  Commerce: Commerce;

  @ManyToOne(() => Category, (category) => category.Products)
  @JoinColumn({ name: 'CategoryId' })
  Category: Category;
}
