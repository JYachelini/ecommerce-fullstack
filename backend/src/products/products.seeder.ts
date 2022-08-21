import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Product, ProductDocument } from './schemas/products.schema';

export class ProductSeeder implements Seeder {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async drop(): Promise<any> {
    return await this.productModel.deleteMany({});
  }

  async seed(): Promise<any> {
    const products = DataFactory.createForClass(Product).generate(100);
    return await this.productModel.insertMany(products);
  }
}
