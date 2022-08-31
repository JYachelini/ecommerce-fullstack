import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/products.schema';
import { ProductsRepository } from './products.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
