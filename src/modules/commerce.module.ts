import { Module } from '@nestjs/common';
import { Commerce } from 'src/domain/entities/commerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './type.module';
import { CommerceController } from 'src/infrastructure/api/commerce/commerce.controller';
import { CreateCommerceUseCase } from 'src/application/commerce-use-case/create/create-commerce';
import { DeleteCommerceUseCase } from 'src/application/commerce-use-case/delete/delete-commerce';
import { GetAllCommerceUseCase } from 'src/application/commerce-use-case/getAll/getAll-commerce';
import { UpdateCommerceUseCase } from 'src/application/commerce-use-case/update/update-commerce';
import { GetByIdCommerceUseCase } from 'src/application/commerce-use-case/single/getById-commerce';


@Module({
  imports: [TypeOrmModule.forFeature([Commerce]), TypeModule],
  controllers: [CommerceController],
  providers: [CreateCommerceUseCase, DeleteCommerceUseCase, GetAllCommerceUseCase, GetByIdCommerceUseCase, UpdateCommerceUseCase],
  exports: [CreateCommerceUseCase, DeleteCommerceUseCase, GetAllCommerceUseCase, GetByIdCommerceUseCase, UpdateCommerceUseCase],
})
export class CommerceModule { }
