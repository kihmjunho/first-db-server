import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import createSwagger from './config/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
