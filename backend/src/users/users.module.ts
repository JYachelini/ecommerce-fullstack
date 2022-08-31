import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => CartModule),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
