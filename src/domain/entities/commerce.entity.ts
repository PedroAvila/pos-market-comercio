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

@Entity({ name: 'Commerces' })
export class Commerce {
  @PrimaryGeneratedColumn()
  CommerceId: number;

  @Column()
  Nombre: string;

  @ManyToOne(() => Type, (type) => type.Commerces)
  @JoinColumn({ name: 'TypeId' })
  Type: Type;

  @OneToMany(() => User, (user) => user.Commerce)
  Users: User[];
}
