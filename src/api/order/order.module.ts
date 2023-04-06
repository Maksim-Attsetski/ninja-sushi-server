import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';

import { Order, OrderSchema } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersModule } from '../users';

export const orderModel = MongooseModule.forFeature([
  { name: Order.name, schema: OrderSchema },
]);

@Module({
  imports: [orderModel],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [orderModel],
})
export class OrderModule {}
