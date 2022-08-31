import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Factory((faker) => faker.commerce.product())
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.commerce.color())
  @Prop({ required: true })
  description: string;

  @Factory((faker) => faker.image.cats())
  @Prop({ required: true })
  imageURL: string;

  @Factory((faker) => faker.commerce.price())
  @Prop({ required: true })
  price: number;

  @Factory((faker) => faker.commerce.department())
  @Prop({ required: true })
  category: string;

  @Factory((faker) => faker.commerce.department())
  @Prop({ required: true })
  subcategory: string;

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModel = model(Product.name, ProductSchema);
