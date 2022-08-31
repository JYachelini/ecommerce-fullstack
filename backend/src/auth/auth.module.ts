import { forwardRef, Global, Inject, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { RolesGuard } from './guards/';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    // JwtModule.registerAsync({
    //   inject: [config.KEY],
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     return {
    //       secret: configService.JWT_SECRET,
    //       signOptions: { expiresIn: '1h' },
    //     };
    //   },
    // }),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
