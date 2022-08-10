import { AuthService } from './../services/auth.service';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tokens, User } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return await this.authService.signup(body.login, body.password);
  }

  @Post('login')
  async signin(@Body() body: CreateUserDto) {
    return await this.authService.login(body.login, body.password);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Body() { refreshToken }: Tokens) {
    return this.authService.updateRT(refreshToken);
  }
}
