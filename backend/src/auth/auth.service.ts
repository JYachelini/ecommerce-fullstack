import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserInterface } from '../users/interfaces/user.interface';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';
import { UsersRepository } from 'src/users/users.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject(forwardRef(() => UsersRepository))
    private usersRepository: UsersRepository,
  ) {}

  validateUser = async (username: string, password: string) => {
    // Validate user for login
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

    const payload: UserInterface = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      address: user.address,
    };

    const tokens = await this.getTokens(payload);
    await this.usersRepository.updateRefreshTokenHash(
      payload._id,
      tokens.refresh_token,
    );
    return tokens;
  };

  logout = async (_id: ObjectId) => {
    const setRefreshTokenNull = await this.usersRepository.findOneAndUpdate(
      { _id, hashRT: { $ne: null } },
      { hashRT: null },
    );
    if (!setRefreshTokenNull) return { error: 'You are already logout.' };

    return { message: 'Logout Succesfully.' };
  };

  refreshTokens = async (_id: ObjectId, refresh_token: string) => {
    const user = await this.usersRepository.findById(_id);
    if (!user || !user.hashRT) throw new ForbiddenException('Access Denied.');

    const refresh_tokenMatches = await bcrypt.compare(
      refresh_token,
      user.hashRT,
    );
    if (!refresh_tokenMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user);
    await this.usersRepository.updateRefreshTokenHash(
      user._id,
      tokens.refresh_token,
    );
    return tokens;
  };

  // Utils

  hashData = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  };

  getTokens = async (user: UserInterface) => {
    if (user.error) return { error: user.error };

    const { _id, username, name, email, phone, roles, address } = user;

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(
        {
          _id: _id,
          name,
          username,
          email,
          phone,
          role: roles,
          address,
        },
        {
          secret: this.configService.JWT_SECRET,
          expiresIn: '30m',
        },
      ),
      this.jwtService.sign(
        { _id: _id, username },
        { secret: this.configService.JWT_REFRESH_SECRET, expiresIn: '15d' },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  };
}
