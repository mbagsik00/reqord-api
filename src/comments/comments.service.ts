import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.repository.create(createCommentDto);
    return this.repository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.repository.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.repository.preload({
      id,
      ...updateCommentDto
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.repository.save(comment);
  }

  async remove(id: string): Promise<Comment> {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.repository.remove(comment);
  }
}
