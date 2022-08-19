import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // config, example for facebook
  }

  validate = async (username: string, password: string) => {
    const user = await this.authService.validateUser(username, password);

    if (user.error) return { error: user.error };

    if (!user) {
      throw new UnauthorizedException();
    }
    return user.user;
  };
}
