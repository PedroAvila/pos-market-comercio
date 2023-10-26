import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'Name',
    type: 'string',
    required: true,
    description: 'user name',
    example: 'Ramón',
  })
  Name: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'Password',
    type: 'string',
    required: true,
    description: 'password del usuario',
    example: '123456',
  })
  Password: string;
}
