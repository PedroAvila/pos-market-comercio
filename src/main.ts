import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();
console.log('AZURE_SERVICE_BUS_CONNECTION_STRING:', process.env.AZURE_SERVICE_BUS_CONNECTION_STRING);
console.log('KEY_VAULT_URL:', process.env.KEY_VAULT_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('pos')
    .setDescription('The pos API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
