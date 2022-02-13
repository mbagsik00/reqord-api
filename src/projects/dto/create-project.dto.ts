import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty({
    enum: ProjectStatus,
    default: ProjectStatus.NEW
  })
  status: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  repositoryLink?: string;

  @IsArray()
  @ApiProperty()
  tags: string[];

  @IsArray()
  @ApiProperty()
  cards: string[];

  @IsArray()
  @ApiProperty()
  comments: string[];

  @IsArray()
  @ApiProperty()
  members: string[];

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsUUID()
  @IsNotEmpty()
  updatedBy: string;
}
