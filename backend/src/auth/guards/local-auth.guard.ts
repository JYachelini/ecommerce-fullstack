import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(
  'local',
) /* 'local' can change to 'facebook'*/ {
  constructor() {
    super();
  }
}
