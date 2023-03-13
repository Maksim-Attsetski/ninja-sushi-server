import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Sushi } from '../sushi/sushi.entity';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: { latitude: 'number', longitude: 'number' }, default: null })
  location: { latitude: number; longitude: number };

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Sushi' }] })
  order: Sushi[];

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Sushi' }] })
  favorite_sushi_ids: Sushi[];

  @Prop()
  createdAt: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
