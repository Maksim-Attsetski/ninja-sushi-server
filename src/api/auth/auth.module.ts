import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderModule, UsersModule } from 'src/api';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenSchema, Token } from './auth.entity';

const TokenModel = MongooseModule.forFeature([
  { name: Token.name, schema: TokenSchema },
]);

@Module({
  imports: [JwtModule, TokenModel, UsersModule, forwardRef(() => OrderModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TokenModel],
})
export class AuthModule {}
