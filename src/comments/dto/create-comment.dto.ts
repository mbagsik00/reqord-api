import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  projectId: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  cardId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  commentId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  comment: string;

  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @IsUUID()
  @IsNotEmpty()
  updatedBy: string;
}
