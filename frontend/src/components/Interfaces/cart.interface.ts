import { ProductInterface } from './products.interface';

export interface CartInterface {
  userId?: string;
  userAddress?: string;
  userPhone?: string;
  userName?: string;
  userEmail?: string;
  userUsername?: string;
  products: ProductInterface[];
  totalPrice: number;
  totalQuantity: number;
}

export interface CartInterfaceDB {
  _id: string;
  userId?: string;
  userAddress?: string;
  userPhone?: string;
  userName?: string;
  userEmail?: string;
  userUsername?: string;
  products: ProductInterface[];
  totalPrice: number;
  totalQuantity: number;
  status: string;
}
