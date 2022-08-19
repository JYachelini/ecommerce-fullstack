import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return await this.userService.findUserById(user._id).then((user: User) => {
      const hasRole = () => roles.indexOf(user.roles) > -1;
      let hasPermission: boolean = false;

      if (hasRole()) hasPermission = true;

      return user && hasPermission;
    });
  }
}
