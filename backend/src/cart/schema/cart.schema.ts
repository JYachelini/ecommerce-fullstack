import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ProductInCart,
  ProductIntarfaceDatabase,
} from 'src/products/interfaces/products.interface';

export type CartDocument = Cart & Document;

export type statusCart = 'In process.' | 'Done.';

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userAddress: string;

  @Prop({ required: true })
  userPhone: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  userUsername: string;

  @Prop({ required: true })
  products: ProductInCart[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  totalQuantity: number;

  @Prop({ default: 'In process.' })
  status: statusCart;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
