import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentLikeDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  commentId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
