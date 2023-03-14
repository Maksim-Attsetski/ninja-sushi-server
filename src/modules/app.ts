import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ProductModule,
  UsersModule,
  IngredientsModule,
  AuthModule,
} from 'src/api';
import Config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: Config.isDev ? '.env.dev' : `.env.prod`,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    ProductModule,
    IngredientsModule,
    AuthModule,
  ],
})
export class AppModule {}
