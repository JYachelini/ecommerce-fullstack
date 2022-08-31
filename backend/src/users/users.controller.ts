import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
  HttpStatus,
  Query,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import {
  LocalAuthGuard,
  JwtAuthGuard,
  RolesGuard,
  UserIsUserGuard,
  JwtRefreshAuthGuard,
} from '../auth/guards';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { User, UserRole } from './interfaces/user.interface';
import { ObjectId } from 'mongoose';
import { GetCurrentUser, hasRoles } from '../auth/decorator';
import { Response } from 'express';
import { CartService } from 'src/cart/cart.service';

@Controller('')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @Inject(forwardRef(() => CartService)) private cartService: CartService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    const tokens = await this.authService.login(req.user);
    if (tokens.error) res.status(HttpStatus.NOT_FOUND).json(tokens);
    else res.status(HttpStatus.OK).json(tokens);
  }

  @Post('register')
  async register(@Body() user: CreateUserDTO, @Res() res) {
    const registerUser = await this.usersService.register(user);
    if (registerUser._id) {
      res.status(HttpStatus.OK).json(registerUser);
    } else if (registerUser.error) {
      res.status(HttpStatus.NOT_IMPLEMENTED).json(registerUser);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetCurrentUser('_id') _id: ObjectId, @Res() res: Response) {
    const logout = await this.authService.logout(_id);
    res.status(HttpStatus.OK).json(logout);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUser('_id') _id: ObjectId,
    @GetCurrentUser('refresh_token') refresh_token: string,
  ) {
    return this.authService.refreshTokens(_id, refresh_token);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  async users(
    @Res() res,
    @Query('userId') _id: ObjectId,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    let filters = {};
    if (_id) {
      filters = { _id };
    }
    let sorting = {};
    const actual_page: number = Number(page) || 1;
    const limits = Number(limit) || 10;
    const users = await this.usersService.getUsers(
      filters,
      sorting,
      actual_page,
      limits,
    );
    const total_items = await this.usersService.countUsers(filters);

    if (users) {
      res.status(HttpStatus.OK).json({
        users,
        total_items,
        actual_page,
        last_page: Math.ceil(total_items / limits),
      });
    } else {
      res.status(HttpStatus.CONFLICT).json({ users });
    }
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put('user/:id')
  async updateUser(@Body() user: User, @Param('id') id: ObjectId, @Res() res) {
    if (user.roles)
      throw new UnauthorizedException('You cannot update your own role.');

    // if (user.email)
    //   throw new UnauthorizedException('You cannot update your own email.');

    if (user._id)
      throw new UnauthorizedException('You cannot update your own id.');

    // if (user.username)
    //   throw new UnauthorizedException('You cannot update your own username.');

    const resp = await this.usersService.updateUser(id, user);
    res.status(resp.statusCode).json(resp.message);
  }
}
