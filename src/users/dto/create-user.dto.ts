import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty({
    enum: UserRoles,
    default: UserRoles.USER
  })
  role: UserRoles;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string;

  status: UserStatus;
  createdBy: string;
  updatedBy: string;
}
