import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CommerceService } from './commerce.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private commerceService: CommerceService,
  ) {}

  async createCategory(category: CreateCategoryDto) {
    const commerceFound = await this.commerceService.getCommerce(
      category.CommerceId,
    );

    const exist = await this.categoryRepository.findOne({
      where: {
        Name: category.Name,
      },
    });

    if (!commerceFound)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    if (exist)
      return new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );

    const newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        CategoryId: id,
      },
    });

    if (!categoryFound)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return categoryFound;
  }

  async deleteCategory(id: number) {
    const result = await this.categoryRepository.delete({ CategoryId: id });

    if (result.affected === 0)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return result;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        CategoryId: id,
      },
    });

    if (!categoryFound)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    const updateCategory = Object.assign(categoryFound, category);
    return this.categoryRepository.save(updateCategory);
  }
}
