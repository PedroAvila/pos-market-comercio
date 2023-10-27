import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsNotEmpty()
  @ApiProperty({
    name: 'Password',
    type: 'string',
    required: true,
    description: 'password del usuario',
    example: '123456',
  })
  Password: string;

  Email?: string;
  Phone?: string;

  Status: number = 1;
}
