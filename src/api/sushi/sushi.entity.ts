import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Ingredient } from '../ingredients/ingredient.entity';

export type SushiDocument = HydratedDocument<Sushi>;

@Schema()
export class Sushi {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  preview: string;

  @Prop()
  strengths: string[];

  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Ingredient' }] })
  consist: Ingredient[];

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  createdAt: number;
}

export const SushiSchema = SchemaFactory.createForClass(Sushi);
