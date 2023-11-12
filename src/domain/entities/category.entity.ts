import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commerce } from './commerce.entity';
import { Product } from './product.entity';

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

  @OneToMany(() => Product, (product) => product.Category)
  Products: Product[];
}
