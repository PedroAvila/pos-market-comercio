import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from '../entities/commerce.entity';
import { Repository } from 'typeorm';
import { CreateCommerceDto } from '../dto/create-commerce.dto';

import { TypeService } from './type.service';
import { UpdateCommerceDto } from '../dto/update-commerce.dto';

@Injectable()
export class CommerceService {
  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,

    private typeService: TypeService,
  ) {}

  async createCommerce(commerce: CreateCommerceDto) {
    const typeFound = await this.typeService.getType(commerce.TypeId);
    const exist = await this.commerceRepository.findOne({
      where: {
        Name: commerce.Name,
      },
    });

    if (!typeFound) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }

    if (exist) {
      return new HttpException('Commerce alredy exists', HttpStatus.CONFLICT);
    }

    const newCommerce = this.commerceRepository.create(commerce);

    return await this.commerceRepository.save(newCommerce);
  }

  async getCommerces() {
    return await this.commerceRepository.find();
  }

  async getCommerce(id: number) {
    const commerceFound = await this.commerceRepository.findOne({
      where: {
        CommerceId: id,
      },
    });

    if (!commerceFound)
      return new HttpException('Commerce not found', HttpStatus.NOT_FOUND);
    return commerceFound;
  }

  async deleteCommerce(id: number) {
    const result = await this.commerceRepository.delete({ CommerceId: id });

    if (result.affected === 0) {
      return new HttpException('Commerce not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateCommerce(id: number, commerce: UpdateCommerceDto) {
    const commerceFound = await this.commerceRepository.findOne({
      where: {
        CommerceId: id,
      },
    });

    if (!commerceFound) {
      return new HttpException('Commerce not found', HttpStatus.NOT_FOUND);
    }

    const updateCommerce = Object.assign(commerceFound, commerce);
    return this.commerceRepository.save(updateCommerce);
  }
}
