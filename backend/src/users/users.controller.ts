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
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './interfaces/user.interface';
import { ObjectId } from 'mongoose';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';

@Controller('')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    const access_token = await this.authService.login(req.user);
    if (access_token.error) res.status(HttpStatus.NOT_FOUND).json(access_token);
    else res.status(HttpStatus.OK).json(access_token);
  }

  @Post('register')
  async register(@Body() user: CreateUserDTO, @Res() res) {
    const registerUser = await this.usersService.register(user);
    res.status(HttpStatus.OK).json(registerUser);
  }

  @Get('user')
  user(@Req() req, @Res() res) {
    if (req.user) {
      res.status(HttpStatus.OK).json(req.user);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ error: 'No user found' });
    }
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put('user/:id')
  async updateUser(@Body() user: User, @Param('id') id: ObjectId, @Res() res) {
    if (user.roles)
      throw new UnauthorizedException('You cannot update your own role.');

    if (user.email)
      throw new UnauthorizedException('You cannot update your own email.');

    if (user._id)
      throw new UnauthorizedException('You cannot update your own id.');

    const userUpdated = await this.usersService.updateUser(id, user);
    res
      .status(HttpStatus.OK)
      .json({ message: 'User Updated Succesfully.', userUpdated });
  }
}
