import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateCommerceDto } from 'src/domain/dto/create-commerce.dto';
import { UpdateCommerceDto } from 'src/domain/dto/update-commerce.dto';
import { Commerce } from 'src/domain/entities/commerce.entity';
import { CommerceService } from 'src/domain/service/commerce.service';

@Controller('commerce')
export class CommerceController {
  constructor(private commerceService: CommerceService) {}

  @Get()
  async getCommerces(): Promise<Commerce[]> {
    return await this.commerceService.getCommerces();
  }

  @Get(':id')
  async getCommerce(@Param('id', ParseIntPipe) id: number) {
    return await this.commerceService.getCommerce(id);
  }

  @Post()
  async createCommerce(@Body(ValidationPipe) newCommerce: CreateCommerceDto) {
    return this.commerceService.createCommerce(newCommerce);
  }

  @Delete(':id')
  async deleteCommerce(@Param('id', ParseIntPipe) id: number) {
    return this.commerceService.deleteCommerce(id);
  }

  @Put(':id')
  updateCommerce(
    @Param('id', ParseIntPipe) id: number,
    @Body() commerce: UpdateCommerceDto,
  ) {
    return this.commerceService.updateCommerce(id, commerce);
  }
}
