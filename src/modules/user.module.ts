import { Module } from '@nestjs/common';
import { UserController } from '../app/controller/user.controller';
import { UserService } from '../domain/service/user.service';
import { User } from '../domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
