import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(profile: CreateProfileDto) {
    const profileFound = await this.profileRepository.findOne({
      where: {
        Name: profile.Name,
      },
    });

    if (profileFound) {
      return new HttpException('Profile already exists', HttpStatus.CONFLICT);
    }

    const newProfile = this.profileRepository.create(profile);
    return await this.profileRepository.save(newProfile);
  }

  async getProfiles() {
    return await this.profileRepository.find();
  }

  async getProfile(id: number) {
    const profileFound = await this.profileRepository.findOne({
      where: {
        ProfileId: id,
      },
    });

    if (!profileFound) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return profileFound;
  }

  async deleteProfile(id: number) {
    const result = await this.profileRepository.delete({ ProfileId: id });

    if (result.affected === 0) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateProfile(id: number, profile: UpdateProfileDto) {
    const profileFound = await this.profileRepository.findOne({
      where: {
        ProfileId: id,
      },
    });

    if (!profileFound) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    const updateProfile = Object.assign(profileFound, profile);
    return await this.profileRepository.save(updateProfile);
  }
}
