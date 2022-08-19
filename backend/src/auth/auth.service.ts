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

    if (!user) return { error: 'User not found.' };

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) return { error: 'Wrong password.' };

    if (user && isMatchPassword) {
      const { password, username, ...rest } = user;
      return { user };
    }
  };

  login = async (user: User) => {
    if (user.error) return { error: user.error };

    const payload = {
      username: user.username,
      id: user._id,
      avatar: user.avatar,
      phone: user.phone,
      addres: user.address,
    };

    return {
      access_token: this.jwtService.sign({ user: payload }),
    };
  };
}
