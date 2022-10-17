import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { validate } from './config/env.validation';
import { MailModule } from './mail/mail.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      // Connection to MongoDB
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.MONGODB_URI,
      }),
    }),
    ProductsModule,
    CartModule,
    UsersModule,
    AuthModule,
    MailModule,
    ChatModule,
  ],
  providers: [],
  controllers: [],
  // This provider is for protect all routes with JwtAuthGuard.
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  // ],
})
export class AppModule {}
