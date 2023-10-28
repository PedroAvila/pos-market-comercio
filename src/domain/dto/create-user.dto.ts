import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  CommerceId: number;

  UserName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    required: true,
    description: 'user name',
    example: 'Ramón',
  })
  FullName: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Profiles',
    type: 'array',
    required: true,
    description: 'User profiles',
    example: [1, 2, 3],
  })
  Profiles: number[];

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    name: 'Password',
    type: 'string',
    required: true,
    description: 'password del usuario',
    example: '123456',
  })
  Password: string;

  @IsEmail()
  Email?: string;

  Phone?: string;

  Status: number = 1;
}
