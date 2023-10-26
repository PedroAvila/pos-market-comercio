import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from 'src/app/controller/type.controller';
import { Type } from 'src/domain/entities/type.entity';
import { TypeService } from 'src/domain/service/type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}
