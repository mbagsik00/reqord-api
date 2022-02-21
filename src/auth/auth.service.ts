import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginAuthDto: LoginAuthDto): Promise<string> {
    const usersResult = await this.usersService.findAll({ email: loginAuthDto.email });

    if (!usersResult.length) {
      throw new NotFoundException(`User not found with email ${loginAuthDto.email}`);
    }

    const user = usersResult[0];

    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);

    if (!isMatch) {
      throw new ForbiddenException('Incorrect Password');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    return this.jwtService.sign(jwtPayload);
  }
}
