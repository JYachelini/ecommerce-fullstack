import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/db/entity.repository';
import { Product } from './interfaces/products.interface';
import { ProductDocument } from './schemas/products.schema';

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
  // Injecto el modelo del producto
  constructor(@InjectModel('Product') productModel: Model<Product>) {
    super(productModel);
  }
}
