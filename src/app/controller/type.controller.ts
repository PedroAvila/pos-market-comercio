import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateTypeDto } from 'src/domain/dto/create-type.dto';
import { TypeService } from 'src/domain/service/type.service';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Post()
  createType(@Body(ValidationPipe) newType: CreateTypeDto) {
    return this.typeService.createType(newType);
  }
}
