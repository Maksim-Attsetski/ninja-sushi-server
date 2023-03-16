import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  image: string;

  @Prop()
  createdAt: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
