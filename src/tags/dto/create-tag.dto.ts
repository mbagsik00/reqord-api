import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tag: string;

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsUUID()
  @IsNotEmpty()
  updatedBy: string;
}
