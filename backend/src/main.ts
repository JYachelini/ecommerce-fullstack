import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const front_port = configService.get('FRONTEND_PORT') || 5173;
  app.enableCors({
    origin: `http://localhost:${front_port}`,
    credentials: true,
  });
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
