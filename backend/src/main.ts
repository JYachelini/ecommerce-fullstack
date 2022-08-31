import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // ConfigService return the .env values

  const front_port = configService.get('FRONTEND_PORT') || 5173;
  if (configService.get('NODE_ENV') == 'dev') {
    app.enableCors({
      origin: `http://localhost:${front_port}`,
      credentials: true,
    });
  } else if (configService.get('NODE_ENV') == 'prod') {
    app.enableCors({
      origin: `https://jyachelini.github.io`,
      credentials: true,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
