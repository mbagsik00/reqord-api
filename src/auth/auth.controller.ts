import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Res,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  @Post('login')
  async login(@Body() createAuthDto: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    const jwt = await this.authService.login(createAuthDto);

    response.cookie('authorization', jwt, { httpOnly: true });

    return {
      message: 'Login success!'
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('authorization');

    return {
      message: 'Logout success!'
    };
  }

  // TODO: Global guards
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    try {
      const cookie = request.cookies['authorization'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const { password, ...user } = await this.userService.findOne(data.id);

      return user;
    } catch (err) {
      console.error('Error getting user profile: ', { error: err });
      throw new UnauthorizedException();
    }
  }
}
