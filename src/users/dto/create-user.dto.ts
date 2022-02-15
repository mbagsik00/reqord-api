import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @IsBoolean()
  @ApiProperty()
  verified: boolean;

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

  @IsString()
  @ApiProperty({
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: UserStatus;

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsUUID()
  @IsNotEmpty()
  updatedBy: string;
}
