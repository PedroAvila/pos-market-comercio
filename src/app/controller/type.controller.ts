import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from 'src/domain/dto/create-type.dto';
import { UpdateTypeDto } from 'src/domain/dto/update-type.dto';
import { Type } from 'src/domain/entities/type.entity';
import { TypeService } from 'src/domain/service/type.service';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  async getTypes(): Promise<Type[]> {
    return await this.typeService.getTypes();
  }

  @Get(':id')
  async getType(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.getType(id);
  }

  @Post()
  async createType(@Body(ValidationPipe) newType: CreateTypeDto) {
    return await this.typeService.createType(newType);
  }

  @Delete(':id')
  async deleteType(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.deleteType(id);
  }

  @Put(':id')
  async updateType(@Param('id') id: number, @Body() type: UpdateTypeDto) {
    return await this.typeService.updateType(id, type);
  }
}
