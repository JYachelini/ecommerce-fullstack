import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  Response,
  UseGuards,
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
  async login(@Request() req, @Response() res) {
    const access_token = await this.authService.login(req.user);
    res.json(access_token);
  }

  @Post('register')
  async register(@Body() user: CreateUserDTO, @Res() res) {
    const registerUser = await this.usersService.register(user);
    res.json(registerUser);
  }

  @Get('user')
  user(@Request() req, @Response() res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ error: 'No user found' });
    }
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put('user/:id')
  async updateUser(@Body() user: User, @Param('id') id: ObjectId, @Res() res) {
    const userUpdated = await this.usersService.updateUser(id, user);
    res.json({ message: 'User Updated Succesfully.', userUpdated });
  }
}
