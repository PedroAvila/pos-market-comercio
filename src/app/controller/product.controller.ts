import {
  Controller,
  Get,
  ValidationPipe,
  Body,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/domain/dto/create-product.dto';
import { UpdateProductDto } from 'src/domain/dto/updatge-product.dto';
import { Product } from 'src/domain/entities/product.entity';
import { ProductService } from 'src/domain/service/product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Post()
  async createProduct(@Body(ValidationPipe) newProduct: CreateProductDto) {
    return await this.productService.createProduct(newProduct);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, product);
  }
}
