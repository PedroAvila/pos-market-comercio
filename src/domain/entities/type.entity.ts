import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commerce } from './commerce.entity';

@Entity({ name: 'Types' })
export class Type {
  @PrimaryGeneratedColumn()
  TypeId: number;

  @Column({ unique: true })
  Name: string;

  @OneToMany(() => Commerce, (commerce) => commerce.Type)
  Commerces: Commerce[];
}
