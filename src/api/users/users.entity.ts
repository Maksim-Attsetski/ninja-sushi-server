import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.entity';

export type UsersDocument = HydratedDocument<Users>;

export interface ILocation {
  city: string;
  country: string;
  street: string;
  home: string;
  entrance: number; // подъезд
  floor: number; // этаж
  flat: number; // кв
}

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop({ type: [{ type: {} as ILocation }] })
  location: ILocation;

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Product' }] })
  favorite_products_ids: Product[];

  @Prop()
  createdAt: number;

  @Prop({ default: ['pass'] })
  providers: ['pass' | 'google'];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
