import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  resource: string;

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsUUID()
  @IsNotEmpty()
  updatedBy: string;
}
