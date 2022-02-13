import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repository: Repository<Project>) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.repository.create(createProjectDto);
    return this.repository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.repository.findOne(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.repository.preload({
      id,
      ...updateProjectDto
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return this.repository.save(project);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.findOne(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return this.repository.remove(project);
  }
}
