import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ProfileService } from './profile.service';
import { CommerceService } from './commerce.service';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private commerceService: CommerceService,
    private profileService: ProfileService,
  ) {}

  async createUser(user: CreateUserDto) {
    const commerceFound = await this.commerceService.getCommerce(
      user.CommerceId,
    );
    const userFound = await this.userRepository.findOne({
      where: {
        Email: user.Email,
        CommerceId: user.CommerceId,
      },
    });

    if (!commerceFound) {
      return new HttpException('Commerce not found', HttpStatus.NOT_FOUND);
    }

    if (userFound) {
      return new HttpException('User alredy exists', HttpStatus.CONFLICT);
    }

    var profileIds = await this.profileService.getProfileIds(user.Profiles);
    const entity = new User();
    entity.profiles = profileIds;
    user.Password = await bcryptjs.hash(user.Password, 10);

    const newUser = this.userRepository.create(Object.assign(entity, user));
    return await this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        UserId: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async getEmail(commerceId: number, user: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        CommerceId: commerceId,
        UserName: user,
      },
      relations: ['profiles'],
    });
    return userFound;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ UserId: id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        UserId: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
}
