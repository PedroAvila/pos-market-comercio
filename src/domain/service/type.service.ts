import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../entities/type.entity';
import { Repository } from 'typeorm';
import { CreateTypeDto } from '../dto/create-type.dto';
import { UpdateTypeDto } from '../dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
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

  async getTypes() {
    return await this.typeRepository.find();
  }

  async getType(id: number) {
    const typeFound = await this.typeRepository.findOne({
      where: {
        TypeId: id,
      },
    });

    if (!typeFound) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    return typeFound;
  }

  async deleteType(id: number) {
    const result = await this.typeRepository.delete({ TypeId: id });

    if (result.affected === 0) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateType(id: number, type: UpdateTypeDto) {
    const typeFound = await this.typeRepository.findOne({
      where: {
        TypeId: id,
      },
    });

    if (!typeFound) {
      return new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }

    const updateType = Object.assign(typeFound, type);
    return await this.typeRepository.save(updateType);
  }
}
