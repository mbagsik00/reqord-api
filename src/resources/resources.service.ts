import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(@InjectRepository(Resource) private readonly repository: Repository<Resource>) {}

  create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.repository.create(createResourceDto);
    return this.repository.save(resource);
  }

  findAll(): Promise<Resource[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.repository.findOne(id);

    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }

    return resource;
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.repository.preload({
      id,
      ...updateResourceDto
    });

    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }

    return this.repository.save(resource);
  }

  async remove(id: string): Promise<Resource> {
    const resource = await this.findOne(id);

    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }

    return this.repository.remove(resource);
  }
}
