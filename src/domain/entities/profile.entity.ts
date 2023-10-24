import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  ProfileId: number;

  @Column()
  Name: string;

  @ManyToMany(() => User, (user) => user.profiles)
  users: User[];
}
