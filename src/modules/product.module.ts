import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { CommerceModule } from './commerce.module';
import { ProductController } from 'src/app/controller/product.controller';
import { ProductService } from 'src/domain/service/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommerceModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
