import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderModule, orderModel } from './order.module';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrderDto } from './dto/get-order.dto';
export * from './order.entity';

export {
  orderModel,
  OrderService,
  OrderController,
  OrderModule,
  // dto
  GetOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
};
