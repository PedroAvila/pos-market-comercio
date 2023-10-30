import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  ValidationPipe,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from 'src/domain/dto/create-table.dto';
import { Table } from 'src/domain/entities/table.entity';
import { TableService } from 'src/domain/service/table.service';
import { UpdateTableDto } from '../../domain/dto/update-table.dto';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get()
  async getTables(): Promise<Table[]> {
    return await this.tableService.getTables();
  }

  @Get(':id')
  async getTable(@Param('id', ParseIntPipe) id: number) {
    return await this.tableService.getTable(id);
  }

  @Post()
  async createTable(@Body(ValidationPipe) newTable: CreateTableDto) {
    return await this.tableService.createTable(newTable);
  }

  @Put(':id')
  async updateTable(@Param('id') id: number, @Body() table: UpdateTableDto) {
    return await this.tableService.updateTable(id, table);
  }
}
