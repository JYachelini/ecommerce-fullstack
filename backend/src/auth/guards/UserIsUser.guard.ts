import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../users/interfaces/user.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const user = request.user;

    return this.userService.findUserById(user._id).then((user: User) => {
      let hasPermission = false;

      if (user.id === params.id) {
        hasPermission = true;
      }

      return user && hasPermission;
    });
  }
}
