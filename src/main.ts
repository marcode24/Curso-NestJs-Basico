import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // config pipes globaly
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove attributes not defined on DTO
    // forbidNonWhitelisted: true
    // alert to client which attributes are not defined
  }))
  await app.listen(3000);
}
bootstrap();
