import { Document, ObjectId } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly category: string;
  readonly subcategory: string;
  readonly stock: number;
}

export interface ProductIntarfaceDatabase extends Document {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly category: string;
  readonly subcategory: string;
  readonly stock: number;
}

export interface ProductInCart {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly category: string;
  readonly subcategory: string;
  readonly quantity: number;
}
