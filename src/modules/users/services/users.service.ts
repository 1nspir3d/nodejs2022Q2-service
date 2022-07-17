import { Injectable } from '@nestjs/common';
import { DbService } from 'src/modules/db/services/db.service';
import { User } from 'src/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async all(): Promise<Omit<User, 'password'>[]> {
    return this.dbService.getUsers();
  }

  async get(id: string): Promise<Omit<User, 'password'>> {
    return this.dbService.getUser(id);
  }

  async create(payload: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.dbService.createUser(payload);
  }

  async update(
    id: string,
    payload: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    return this.dbService.updatePassword(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.dbService.deleteUser(id);
  }
}
