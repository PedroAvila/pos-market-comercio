import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/table.entity';
import { Repository } from 'typeorm';
import { CommerceService } from './commerce.service';
import { CreateTableDto } from '../dto/create-table.dto';
import { UpdateTableDto } from '../dto/update-table.dto';
import { StatusTable } from '../enums/status-table.enum';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,

    private commerceService: CommerceService,
  ) {}

  async createTable(table: CreateTableDto) {
    const commerceFound = await this.commerceService.getCommerce(
      table.CommerceId,
    );
    const exist = await this.tableRepository.findOne({
      where: {
        Name: table.Name,
      },
    });

    if (!commerceFound) {
      return new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }

    if (exist) {
      return new HttpException('Table alredy exists', HttpStatus.CONFLICT);
    }

    table.Status = StatusTable.ENABLED;
    const newTable = this.tableRepository.create(table);
    return await this.tableRepository.save(newTable);
  }

  async getTables() {
    return await this.tableRepository.find();
  }

  async getTable(id: number) {
    const tableFound = await this.tableRepository.findOne({
      where: {
        TableId: id,
      },
    });

    if (!tableFound) {
      return new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }
    return tableFound;
  }

  async deleteTable(id: number) {
    const result = await this.tableRepository.delete({ CommerceId: id });

    if (result.affected === 0) {
      return new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateTable(id: number, table: UpdateTableDto) {
    const tableFound = await this.tableRepository.findOne({
      where: {
        TableId: id,
      },
    });

    if (!tableFound) {
      return new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }

    const updateTable = Object.assign(tableFound, table);
    return this.tableRepository.save(updateTable);
  }
}
