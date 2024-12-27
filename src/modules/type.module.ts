import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTypeUseCase } from 'src/application/type-use-case/create/create-type';
import { DeleteTypeUseCase } from 'src/application/type-use-case/delete/delete-type';
import { GetAllTypeUseCase } from 'src/application/type-use-case/getAll/getAll-type';
import { GetByIdTypeUseCase } from 'src/application/type-use-case/single/getById-type';
import { UpdateTypeUseCase } from 'src/application/type-use-case/update/update-type';

import { Type } from 'src/domain/entities/type.entity';
import { TypeController } from 'src/infrastructure/api/type/type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [CreateTypeUseCase, DeleteTypeUseCase, GetAllTypeUseCase, GetByIdTypeUseCase, UpdateTypeUseCase],
  exports: [TypeOrmModule, CreateTypeUseCase, DeleteTypeUseCase, GetAllTypeUseCase, GetByIdTypeUseCase, UpdateTypeUseCase],
})
export class TypeModule { }
