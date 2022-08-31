import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schema/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
    MailModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
