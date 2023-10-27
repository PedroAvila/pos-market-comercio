import { Module } from '@nestjs/common';
import { UserController } from '../app/controller/user.controller';
import { UserService } from '../domain/service/user.service';
import { User } from '../domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceModule } from './commerce.module';
import { ProfileModule } from './profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommerceModule, ProfileModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
