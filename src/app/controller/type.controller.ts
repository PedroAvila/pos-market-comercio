import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateTypeDto } from 'src/domain/dto/create-type.dto';
import { Type } from 'src/domain/entities/type.entity';
import { TypeService } from 'src/domain/service/type.service';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  getTypes(): Promise<Type[]> {
    return this.typeService.getTypes();
  }

  @Post()
  createType(@Body(ValidationPipe) newType: CreateTypeDto) {
    return this.typeService.createType(newType);
  }
}
