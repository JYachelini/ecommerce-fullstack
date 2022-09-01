import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { hasRoles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { UserRole } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private usersService: UsersService,
  ) {}

  @hasRoles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async createOrder(
    @Res() res: Response,
    @Body() createCartDTO: CreateCartDTO,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (Object.keys(createCartDTO).length == 0) throw new BadRequestException();
    const resp = await this.cartService.createOrder(createCartDTO, user);
    if (resp.errors) {
      res.status(HttpStatus.CONFLICT).json(resp.errors);
    } else {
      res.status(HttpStatus.OK).json(resp);
    }
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getOrders(
    @Res() res,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('userId') userId: ObjectId,
    @Query('cartId') _id: ObjectId,
  ) {
    let filters = {};
    if (userId) {
      filters = { userId };
    }
    if (_id) {
      filters = { _id };
    }
    const actual_page: number = Number(page) || 1;
    const limits = Number(limit) || 10;

    const orders = await this.cartService.getOrders(
      filters,
      { createdAt: 'desc' },
      actual_page,
      limits,
    );
    const total_items = orders.count;

    return res.status(HttpStatus.OK).json({
      orders: orders.orders,
      total_items,
      actual_page,
      last_page: Math.ceil(total_items / limits),
    });
  }
}
