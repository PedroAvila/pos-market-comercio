import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/domain/entities/category.entity';
import { CommerceModule } from './commerce.module';
import { CategoryController } from 'src/app/controller/category.controller';
import { CategoryService } from 'src/domain/service/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CommerceModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
