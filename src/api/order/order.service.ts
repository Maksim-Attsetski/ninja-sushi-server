import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IQuery, MongoUtils } from 'src/utils';

import { Product, ProductDocument } from '../product';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, TOrderDocument } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<TOrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await MongoUtils.create({
      model: this.orderModel,
      data: createOrderDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.orderModel,
      query,
      dto: GetOrderDto,
      populate: [{ path: 'products', populate: 'product' }],
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.orderModel,
      id,
      error: 'Order',
      dto: GetOrderDto,
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await MongoUtils.update({
      model: this.orderModel,
      data: updateOrderDto,
      id,
      error: 'Order',
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.orderModel,
      id,
      error: 'Order',
    });
  }
  async removeMany(filter: any): Promise<number> {
    const res = await this.orderModel.deleteMany(filter);
    return res.deletedCount;
  }
}
