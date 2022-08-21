import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import { ProductSeeder } from './products.seeder';
import { Product, ProductSchema } from './schemas/products.schema';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://julian:yYh1YRWZiJ0EcbHi@cluster0.ovaqa.mongodb.net/ecommerce?retryWrites=true',
    ),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
}).run([ProductSeeder]);
