import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/interfaces/user.interface';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/') // Example: localhost:8080/products
  async getProducts(@Res() res: Response) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({ products });
  }

  @Get('/:id') // Example: localhost:8080/products/62f574b08880dcedb3e7927f     <- Need id from Param
  async getProduct(@Res() res: Response, @Param('id') id: ObjectId) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product Does not exists');
    else return res.status(HttpStatus.OK).json({ product });
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/') // Example: localhost:8080/products/     <- Need body
  async createProduct(
    @Res() res: Response,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.createProduct(createProductDTO);
    if (product.errors) return res.status(HttpStatus.BAD_REQUEST).json(product);
    else
      return res.status(HttpStatus.OK).json({
        message: 'Product Successfully Created',
        product,
      });
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/') // Example: localhost:8080/products?id=62f574b08880dcedb3e7927f    <- Need Query & Body
  async updateProduct(
    @Res() res: Response,
    @Body() createProductDTO: CreateProductDTO,
    @Query('id') id: ObjectId,
  ) {
    const productUpdated = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!productUpdated) throw new NotFoundException('Product Does not exists');
    else
      return res.status(HttpStatus.OK).json({
        message: 'Product Updated Successfully',
        productUpdated,
      });
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/') // Example: localhost:8080/products?id=62f574b08880dcedb3e7927f    <- Need Query
  async deleteProduct(@Res() res: Response, @Query('id') id: ObjectId) {
    const productDeleted = await this.productService.deleteProduct(id);
    if (!productDeleted) throw new NotFoundException('Product Does not exists');
    else
      return res.status(HttpStatus.OK).json({
        message: 'Product Deleted Succesfully',
        productDeleted,
      });
  }
}
