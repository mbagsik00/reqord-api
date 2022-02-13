import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLike } from './entities/comment-like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([CommentLike])],
  controllers: [CommentLikesController],
  providers: [CommentLikesService]
})
export class CommentLikesModule {}
