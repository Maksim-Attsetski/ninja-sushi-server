import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './users.entity';
import { OrderService, orderModel } from '../order';

const UserModel = MongooseModule.forFeature([
  { name: Users.name, schema: UsersSchema },
]);

@Module({
  imports: [UserModel, forwardRef(() => orderModel)],
  controllers: [UsersController],
  providers: [UsersService, OrderService],
  exports: [UserModel],
})
export class UsersModule {}
