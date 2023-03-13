import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient, IngredientSchema } from './ingredient.entity';

const IngredientsModel = MongooseModule.forFeature([
  { name: Ingredient.name, schema: IngredientSchema },
]);

@Module({
  imports: [IngredientsModel],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
