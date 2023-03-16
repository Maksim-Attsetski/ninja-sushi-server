import {} from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Product } from '../product';
import { Users } from '../users';

export type TOrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  tips: number; // чаевые

  @Prop({ required: true })
  delivery: boolean;

  @Prop({ required: true })
  deliveryTime: number;

  @Prop({ default: 'cash' })
  paymentsType: 'cash' | 'card' | 'card courier' | 'card courier';

  @Prop()
  comment: string;

  @Prop()
  status: 'not paid' | 'paid';

  @Prop({
    required: true,
    type: [{ type: MSchema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];

  @Prop({
    required: true,
    type: MSchema.Types.ObjectId,
    ref: 'Users',
  })
  authorId: Users;

  @Prop()
  createdAt: number;

  @Prop()
  archivedAt: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
