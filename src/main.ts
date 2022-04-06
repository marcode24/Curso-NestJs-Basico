import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // config pipes globaly
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove attributes not defined on DTO
    // forbidNonWhitelisted: true
    // alert to client which attributes are not defined
  }));

  // config for documentation
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Store - example')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // config cors
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
