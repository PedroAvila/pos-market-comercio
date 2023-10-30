import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commerce } from './commerce.entity';
import { StatusTable } from '../enums/status-table.enum';

@Entity('Tables')
export class Table {
  @PrimaryGeneratedColumn()
  TableId: number;

  @Column()
  CommerceId: number;

  @Column({ unique: true })
  Name: string;

  @Column()
  Status: number;

  @ManyToOne(() => Commerce, (commerce) => commerce.Tables)
  @JoinColumn({ name: 'CommerceId' })
  Commerce: Commerce;
}
