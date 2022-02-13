import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { CommentLike } from './entities/comment-like.entity';
// import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike) private readonly repository: Repository<CommentLike>
  ) {}

  create(createCommentLikeDto: CreateCommentLikeDto): Promise<CommentLike> {
    const commentLike = this.repository.create(createCommentLikeDto);
    return this.repository.save(commentLike);
  }

  findAll(): Promise<CommentLike[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<CommentLike> {
    const commentLike = await this.repository.findOne(id);

    if (!commentLike) {
      throw new NotFoundException(`Comment Like with id ${id} not found`);
    }

    return commentLike;
  }

  // update(id: string, updateCommentLikeDto: UpdateCommentLikeDto) {
  //   return `This action updates a #${id} commentLike`;
  // }

  async remove(id: string): Promise<CommentLike> {
    const commentLink = await this.findOne(id);

    if (!commentLink) {
      throw new NotFoundException(`Comment Like with id ${id} not found`);
    }

    return this.repository.remove(commentLink);
  }
}
