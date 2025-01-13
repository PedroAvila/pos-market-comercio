import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTypeUseCase, DeleteTypeUseCase, GetAllTypeUseCase, GetByIdTypeUseCase, UpdateTypeUseCase } from 'src/application/type-use-case';
import { Type } from 'src/domain/entities/type.entity';
import { TypeService } from 'src/domain/services/type.service';
import { AzureQueueAdapter } from 'src/infrastructure/adapters/azure-queue-adapter';
import { TypeController } from 'src/infrastructure/api/type/type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [
    {
      provide: 'ICreateTypeUseCase',
      useClass: CreateTypeUseCase
    },
    {
      provide: 'IGetTypeUseCase',
      useClass: GetAllTypeUseCase
    },
    {
      provide: 'IGetByIdTypeUseCase',
      useClass: GetByIdTypeUseCase
    },
    {
      provide: 'IUpdateTypeUseCase',
      useClass: UpdateTypeUseCase
    },
    {
      provide: 'IDeleteTypeUseCase',
      useClass: DeleteTypeUseCase
    },
    {
      provide: 'ITypeServicePort',
      useClass: TypeService
    },
    {
      provide: 'IAzureQueuePort',
      useClass: AzureQueueAdapter
    }
  ],
  exports: [TypeOrmModule,],
})
export class TypeModule { }
