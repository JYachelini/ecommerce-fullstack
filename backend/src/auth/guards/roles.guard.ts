import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  RequestUser,
  User,
  UserRole,
} from '../../users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const role = this.reflector.get<UserRole>('roles', context.getHandler());
    // Role can be 'user' or 'admin', it specified on @hasRole() decorator
    if (!role) return true;

    const request = context.switchToHttp().getRequest();
    const user: RequestUser = request.user;

    return await this.userService.findUserById(user._id).then((user: User) => {
      const hasRole = () => user.roles.includes(role);
      let hasPermission: boolean = false;

      if (hasRole()) hasPermission = true;

      return user && hasPermission;
    });
  }
}
