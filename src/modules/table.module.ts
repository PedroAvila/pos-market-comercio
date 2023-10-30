import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableController } from 'src/app/controller/table.controller';
import { Table } from 'src/domain/entities/table.entity';
import { TableService } from 'src/domain/service/table.service';
import { CommerceModule } from './commerce.module';

@Module({
  imports: [TypeOrmModule.forFeature([Table]), CommerceModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
