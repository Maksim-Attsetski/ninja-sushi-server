import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ required: true })
  name: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
