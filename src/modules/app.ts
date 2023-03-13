import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const node_env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        !node_env || node_env === 'development' ? '.env.dev' : `.env.prod`,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
})
export class AppModule {}
