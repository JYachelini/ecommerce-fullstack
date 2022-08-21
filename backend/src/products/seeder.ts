import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import config from '../config/config';
import { ProductSeeder } from './products.seeder';
import { Product, ProductSchema } from './schemas/products.schema';

seeder({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.MONGODB_URI,
      }),
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
}).run([ProductSeeder]);
