import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../entities/type.entity';
import { Repository } from 'typeorm';
import { CreateTypeDto } from '../dto/create-type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type) private typeRepository: Repository<Type>,
  ) {}

  async createType(type: CreateTypeDto) {
    const typeFound = await this.typeRepository.findOne({
      where: {
        Name: type.Name,
      },
    });

    if (typeFound) {
      return new HttpException('Type alredy exists', HttpStatus.CONFLICT);
    }

    const newType = this.typeRepository.create(type);
    return await this.typeRepository.save(newType);
  }
}
