import { Module } from '@nestjs/common';
import { Commerce } from 'src/domain/entities/commerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './type.module';
import { CommerceController } from 'src/infrastructure/api/commerce/commerce.controller';
import { CreateCommerceUseCase, DeleteCommerceUseCase, GetByIdCommerceUseCase, GetCommerceUseCase, UpdateCommerceUseCase } from 'src/application/commerce-use-case';



@Module({
  imports: [TypeOrmModule.forFeature([Commerce]), TypeModule],
  controllers: [CommerceController],
  providers: [
    {
      provide: 'ICreateCommerceUseCase',
      useClass: CreateCommerceUseCase
    },
    {
      provide: 'IGetCommerceUseCase',
      useClass: GetCommerceUseCase
    },
    {
      provide: 'IGetByIdCommerceUseCase',
      useClass: GetByIdCommerceUseCase
    },
    {
      provide: 'IUpdateCommerceUseCase',
      useClass: UpdateCommerceUseCase
    },
    {
      provide: 'IDeleteCommerceUseCase',
      useClass: DeleteCommerceUseCase
    },
  ],
  exports: [],
})
export class CommerceModule { }
