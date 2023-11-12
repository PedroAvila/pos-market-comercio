import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CommerceService } from './commerce.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/updatge-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private commerceService: CommerceService,
  ) {}

  async createProduct(product: CreateProductDto) {
    const commerceFound = await this.commerceService.getCommerce(
      product.CommerceId,
    );

    const exist = await this.productRepository.findOne({
      where: {
        Name: product.Name,
        CategoryId: product.CategoryId,
      },
    });

    if (!commerceFound)
      return new HttpException('Commerce no found', HttpStatus.NOT_FOUND);

    if (exist)
      return new HttpException(
        'Product already exists',
        HttpStatus.BAD_REQUEST,
      );

    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: {
        ProductId: id,
      },
    });

    if (!productFound)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);

    const updateProduct = Object.assign(productFound, product);
    return this.productRepository.save(updateProduct);
  }
}
