import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly repository: Repository<Tag>) {}

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.repository.create(createTagDto);
    return this.repository.save(tag);
  }

  findAll(): Promise<Tag[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.repository.findOne(id);

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.repository.preload({
      id,
      ...updateTagDto
    });

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return this.repository.save(tag);
  }

  async remove(id: string): Promise<Tag> {
    const tag = await this.findOne(id);

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return this.repository.remove(tag);
  }
}
