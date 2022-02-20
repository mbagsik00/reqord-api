import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatus } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

interface UsersQuery {
  email?: string;
}
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    user.status = UserStatus.ACTIVE;
    user.password = passwordHash;

    // TODO: FIXME: User userId in the token for this
    user.createdBy = 'ef586f15-687b-4bd3-ba07-a6a6e52b243d';
    user.updatedBy = 'ef586f15-687b-4bd3-ba07-a6a6e52b243d';

    // TODO: Map return data
    return this.repository.save(user);
  }

  findAll(query?: UsersQuery): Promise<User[]> {
    if (query) {
      return this.repository.find({ where: query });
    }

    return this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.preload({
      id,
      ...updateUserDto
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.repository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.repository.remove(user);
  }
}
