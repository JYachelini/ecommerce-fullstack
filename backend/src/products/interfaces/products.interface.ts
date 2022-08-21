import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly category: string;
  readonly subcategory: string;
  readonly stock: number;
}
