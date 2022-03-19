import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { environmets } from './environment';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ProductsModule,
    UsersModule,
    // config .env files
    ConfigModule.forRoot({
      envFilePath: environmets[process.env.NODE_ENV] || '.env',
      load: [ config ],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
