import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from 'src/domain/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/domain/dto/update-profile.dto';
import { Profile } from 'src/domain/entities/profile.entity';
import { ProfileService } from 'src/domain/service/profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getProfiles(): Promise<Profile[]> {
    return await this.profileService.getProfiles();
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.getProfile(id);
  }

  @Post()
  async createProfile(@Body(ValidationPipe) newProfile: CreateProfileDto) {
    return await this.profileService.createProfile(newProfile);
  }

  @Delete(':id')
  async deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.deleteProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() profile: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(id, profile);
  }
}
