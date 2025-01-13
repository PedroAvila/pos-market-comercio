import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Commerce } from './commerce.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  CommerceId: number;

  @Column()
  UserName: string;

  @Column()
  FullName: string;

  @Column()
  Password: string;

  @Column()
  Email?: string;

  @Column()
  Phone?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreationDate: Date;

  @Column()
  Status: number;

  @ManyToOne(() => Commerce, (commerce) => commerce.Users)
  @JoinColumn({ name: 'CommerceId' })
  Commerce: Commerce;

  @ManyToMany(() => Profile, (profile) => profile.users)
  @JoinTable({
    name: 'UsersProfiles',
    joinColumn: {
      name: 'UserId',
    },
    inverseJoinColumn: {
      name: 'ProfileId',
    },
  })
  profiles: Profile[];
}
