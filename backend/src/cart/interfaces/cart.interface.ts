import { Document } from 'mongoose';
import { ProductInCart } from 'src/products/interfaces/products.interface';
import { statusCart } from '../schema/cart.schema';

export interface CartInterface extends Document {
  readonly userId: string;
  readonly userAddress: string;
  readonly userPhone: string;
  readonly userName: string;
  readonly userEmail: string;
  readonly userUsername: string;
  readonly products: ProductInCart[];
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly status: statusCart;
}
