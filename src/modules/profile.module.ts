import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from 'src/app/controller/profile.controller';
import { Profile } from 'src/domain/entities/profile.entity';
import { ProfileService } from 'src/domain/service/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
