import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type restaurantsDocument = HydratedDocument<Restaurants>;

export interface IWorkTime {
  from: string;
  to: string;
  breaks: [{ from: string; to: string }];
}

export interface IContact {
  phone?: string[];
  email?: string[];
  website?: string[];
}

@Schema()
export class Restaurants {
  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  street: string;

  @Prop()
  home: string;

  @Prop({ type: {} as IWorkTime })
  workTime: IWorkTime;

  @Prop({ type: {} as IContact })
  contacts: IContact;

  @Prop()
  rate: number;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);
