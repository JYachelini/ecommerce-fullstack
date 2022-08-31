import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refresh_token };
  }
}
