import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Order, OrderSchema } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

const orderModel = MongooseModule.forFeature([
  { name: Order.name, schema: OrderSchema },
]);

@Module({
  imports: [orderModel],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
