import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from './type.entity';
import { User } from './user.entity';
import { Table } from './table.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity({ name: 'Commerces' })
export class Commerce {
  @PrimaryGeneratedColumn()
  CommerceId: number;

  @Column({ unique: true })
  Name: string;

  @ManyToOne(() => Type, (type) => type.Commerces)
  @JoinColumn({ name: 'TypeId' })
  Type: Type;

  @OneToMany(() => User, (user) => user.Commerce)
  Users: User[];

  @OneToMany(() => Table, (table) => table.Commerce)
  Tables: Table[];

  @OneToMany(() => Category, (category) => category.Commerce)
  Categories: Category[];

  @OneToMany(() => Product, (product) => product.Commerce)
  Products: Product[];
}
