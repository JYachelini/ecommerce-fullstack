import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/db/entity.repository';
import { CartInterface } from './interfaces/cart.interface';
import { Cart, CartDocument } from './schema/cart.schema';

export class CartRepository extends EntityRepository<CartDocument> {
  constructor(@InjectModel(Cart.name) cartModel: Model<CartInterface>) {
    super(cartModel);
  }
}
