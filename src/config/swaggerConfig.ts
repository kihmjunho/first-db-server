import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

const createSwagger = (app: INestApplication) => {
  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: { ['admin']: 'password' },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Board API Document')
    .setDescription('Board API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

export default createSwagger;
