import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/modules/users/dto/update-password.dto';
import {
  DBInterface,
  User,
} from 'src/types';
import { v4 } from 'uuid';

@Injectable()
export class DbService {
  private db: DBInterface = {
    albums: {},
    artists: {},
    favorites: {
      albums: [],
      artists: [],
      tracks: [],
    },
    tracks: {},
    users: {},
  };

  checkIfUserExists(id: string) {
    if (this.db.users[id] === undefined) {
      throw new HttpException("User with such id doesn't exist", 404);
    }
  }

  getUsers(): Omit<User, 'password'>[] {
    const users = Object.values(this.db.users).map((origUser) => {
      const user = { ...origUser };
      delete user.password;
      return user;
    });
    return users;
  }

  getUser(id: string): Omit<User, 'password'> {
    this.checkIfUserExists(id);
    const user = { ...this.db.users[id] };
    delete user.password;
    return user;
  }

  createUser(user: CreateUserDto): User {
    const id = v4();
    const createdAt = Date.now();
    const version = 1;
    const newUser: User = {
      id,
      createdAt,
      version,
      updatedAt: createdAt,
      ...user,
    };

    this.db.users[id] = { ...newUser };
    delete newUser.password;
    return newUser;
  }

  updatePassword(id: string, payload: UpdatePasswordDto): User {
    this.checkIfUserExists(id);
    const user = this.db.users[id];
    if (user.password !== payload.oldPassword) {
      throw new HttpException('Old password is incorect', 403);
    }
    const updatedUser: User = {
      ...user,
      updatedAt: Date.now(),
      password: payload.newPassword,
      version: user.version + 1,
    };
    this.db.users[id] = { ...updatedUser };
    delete updatedUser.password;
    return updatedUser;
  }

  deleteUser(id: string): void {
    this.checkIfUserExists(id);
    delete this.db.users[id];
  }

}
