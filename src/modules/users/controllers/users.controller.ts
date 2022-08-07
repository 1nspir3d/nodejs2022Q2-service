import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { IdDto } from '../../id.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return await this.usersService.all();
  }

  @Get(':id')
  async getUser(@Param() params: IdDto): Promise<Omit<User, 'password'>> {
    return await this.usersService.get(params.id);
  }

  @Post()
  async createUser(
    @Body() body: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.usersService.create(body);
  }

  @Put(':id')
  async updatePassword(
    @Param() params: IdDto,
    @Body() body: UpdatePasswordDto,
  ) {
    return await this.usersService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params: IdDto): Promise<void> {
    return await this.usersService.delete(params.id);
  }
}
