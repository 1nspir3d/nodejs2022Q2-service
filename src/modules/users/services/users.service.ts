import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async all(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getAllUsersWithPassword() {
    const users = await this.userRepository.find();
    return users;
  }

  async get(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (user) return user.toResponse();
    throw new HttpException("User with such id doesn't exist", 404);
  }

  async create(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const id = v4();
    const newUser = {
      ...userDto,
      id,
      version: 1,
    };
    const createdUser = this.userRepository.create(newUser);
    console.log('createdUser: ', createdUser);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async update(
    id: string,
    payload: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const updatedUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!updatedUser) {
      throw new HttpException("User with such id doesn't exist", 404);
    }

    if (updatedUser.password !== payload.oldPassword) {
      throw new HttpException('Old password is incorect', 403);
    }

    Object.assign(updatedUser, {
      password: payload.newPassword,
      version: updatedUser.version + 1,
    });

    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException("User with such id doesn't exist", 404);
    }
  }
}
