import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(loginAuthDto: LoginAuthDto): Promise<string> {
    const result = await this.usersService.findAll({ email: loginAuthDto.email });

    if (!result.length) {
      throw new NotFoundException(`User not found with email ${loginAuthDto.email}`);
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);

    if (!isMatch) {
      throw new ForbiddenException('Incorrect Password');
    }

    return 'JWT Token';
  }
}
