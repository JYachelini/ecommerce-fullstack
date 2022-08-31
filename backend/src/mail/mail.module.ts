import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        transport: {
          host: configService.MAIL_HOST,
          port: configService.MAIL_PORT,
          secure: false,
          auth: {
            user: configService.ADMIN_MAIL,
            pass: configService.ADMIN_MAIL_PASSWORD,
          },
        },
        defaults: {
          from: 'No reply <admin@thebrown.com>',
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
