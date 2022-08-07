import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Tokens, User } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const users = await this.usersService.getAllUsersWithPassword();
    const user = users.find((user) => user.login === login);
    if (!user) {
      throw new Error('TEMP MESSAGE');
    }
    if (!this.validatePassword(password, user.password)) {
      throw new Error();
    }
    return this.getTokens(user.id, user.login);
  }

  async signup(login: string, password: string): Promise<User> {
    const hash = await this.hashdata(password);
    const user = await this.usersService.create({
      login,
      password: hash,
    });
    return { ...user, password: undefined };
  }

  async updateRT(rt: string) {
    const { id, login } = this.jwtService.decode(rt) as User;
    if (!this.jwtService.verify(rt)) {
      throw new Error();
    }
    return this.getTokens(id, login);
  }

  async validatePassword(dtoPass, pass) {
    const hash = this.hashdata(dtoPass);
    return hash === pass;
  }

  async hashdata(str: string) {
    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    return await bcrypt.hash(str, salt);
  }

  async getTokens(id: string, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
