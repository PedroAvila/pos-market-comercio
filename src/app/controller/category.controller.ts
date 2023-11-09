import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/domain/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/domain/dto/update-category.dto';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryService } from 'src/domain/service/category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getCategory(id);
  }

  @Post()
  async createCategory(@Body(ValidationPipe) newCategory: CreateCategoryDto) {
    return await this.categoryService.createCategory(newCategory);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, category);
  }
}
