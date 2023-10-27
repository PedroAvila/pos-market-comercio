import { Module } from '@nestjs/common';
import { CommerceController } from 'src/app/controller/commerce.controller';
import { CommerceService } from 'src/domain/service/commerce.service';
import { Commerce } from 'src/domain/entities/commerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from './type.module';
import { ProfileModule } from './profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Commerce]), TypeModule, ProfileModule],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}
