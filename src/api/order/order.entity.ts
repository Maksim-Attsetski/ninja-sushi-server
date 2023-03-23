import {} from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Product } from '../product';
import { Users } from '../users';

export type TOrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  tips: number; // чаевые

  @Prop({ default: false })
  delivery: boolean;

  @Prop()
  deliveryTime: number;

  @Prop({ default: 'cash' })
  paymentsType: 'cash' | 'card' | 'card courier' | 'card courier';

  @Prop()
  comment: string;

  @Prop()
  status: 'not_paid' | 'paid';

  @Prop({
    type: [
      {
        product: { type: MSchema.Types.ObjectId, ref: 'Product' },
        count: { type: 'number', default: 0 },
      },
    ],
  })
  products: [{ product: Product; count: number }];

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Users' })
  authorId: Users;

  @Prop()
  createdAt: number;

  @Prop()
  archivedAt: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
