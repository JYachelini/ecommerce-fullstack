import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser = async (username: string, password: string) => {
    const user = await this.usersService.findUser(username);
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (user && isMatchPassword) {
      const { password, username, ...rest } = user;
      return user;
    }

    return null;
  };

  login = async (user: User) => {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}
