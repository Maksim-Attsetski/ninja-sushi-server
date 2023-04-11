import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ILocation } from '../users';

export type restaurantsDocument = HydratedDocument<Restaurants>;

export interface IContact {
  phone?: string[];
  email?: string[];
  website?: string[];
}

@Schema()
export class Restaurants {
  @Prop({ type: {} as ILocation })
  location: ILocation;

  @Prop()
  open_at: number;

  @Prop()
  close_at: number;

  @Prop()
  breaks: [{ from: string; to: string }];

  @Prop({ type: {} as IContact })
  contacts: IContact;

  @Prop()
  rate: number;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);
