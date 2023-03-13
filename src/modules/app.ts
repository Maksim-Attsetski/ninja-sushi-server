import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SushiModule,
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
    SushiModule,
    IngredientsModule,
    AuthModule,
  ],
})
export class AppModule {}
