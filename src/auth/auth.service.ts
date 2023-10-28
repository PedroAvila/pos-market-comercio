import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/service/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  register() {
    return 'register';
  }

  async login(@Body() login: LoginDto) {
    const userFound = await this.userService.getEmail(
      login.CommerceId,
      login.UserName,
    );

    if (!userFound) {
      return new HttpException('User is wrong', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcryptjs.compare(
      login.Password,
      userFound.Password,
    );

    if (!isPasswordValid) {
      return new HttpException('Password is wrong', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: login.UserName };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      userFound,
    };
  }
}
