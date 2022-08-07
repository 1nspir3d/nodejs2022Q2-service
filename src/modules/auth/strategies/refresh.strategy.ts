import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  async validate({ id }: JwtPayload) {
    if (!id) {
      throw new Error();
    }
    const user = await this.usersService.get(id);
    if (!user) {
      throw new Error();
    }
    return user;
  }
}
