import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Ingredient } from '../ingredients/ingredient.entity';

export type ProductDocument = HydratedDocument<Product>;

export type TProductType = 'sushi' | 'rolls' | 'set';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  article: string;

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

  @Prop({ default: 'sushi', required: true })
  type: TProductType;

  @Prop()
  createdAt: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
