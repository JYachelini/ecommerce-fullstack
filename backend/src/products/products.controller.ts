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
import { hasRoles } from '../auth/decorator';
import { JwtAuthGuard, RolesGuard } from '../auth/guards/';
import { UserRole } from '../users/interfaces/user.interface';
import { CreateProductDTO, UpdateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // Example: localhost:8080/products
  // Example w/params: localhost:8080/products?category=Clothing
  // Example w/params: localhost:8080/products?page=2&limit=5
  @Get('/')
  async getProducts(
    @Res() res: Response,
    @Query('name') name: string,
    @Query('id') _id: ObjectId,
    @Query('category') category: string,
    @Query('subcategory') subcategory: string,
    @Query('sort') sort: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    let filters = {};
    let sorting = {};

    // if (name && category) {
    //   filters = {
    //     $and: [
    //       { name: new RegExp(name.toString(), 'i') },
    //       { category: new RegExp(category.toString(), 'i') },
    //     ],
    //   };
    // }
    if (subcategory && category) {
      filters = {
        $and: [
          { category: new RegExp(category.toString(), 'i') },
          { subcategory: new RegExp(subcategory.toString(), 'i') },
        ],
      };
    } else if (name) {
      filters = { name };
    } else if (category) {
      filters = { category };
    }

    if (_id) {
      filters = { _id };
    }

    if (sort) {
      sorting = { price: sort };
    }
    const actual_page: number = Number(page) || 1;
    const limits = Number(limit) || 10;

    const products = await this.productService.getProducts(
      filters,
      sorting,
      actual_page,
      limits,
    );

    const total_items = await this.productService.getCountProducts(filters);

    return res.status(HttpStatus.OK).json({
      products,
      total_items,
      actual_page,
      last_page: Math.ceil(total_items / limits),
    });
  }

  @Get('/categories') // Example: localhost:8080/products/categories
  async getCategories(@Res() res: Response) {
    const categories = await this.productService.getCategories({});
    res.json(categories);
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
    @Body() updateProductDTO: UpdateProductDTO,
    @Query('id') id: ObjectId,
  ) {
    const productUpdated = await this.productService.updateProduct(
      id,
      updateProductDTO,
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
