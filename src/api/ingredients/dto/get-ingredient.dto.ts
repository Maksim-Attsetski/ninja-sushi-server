import { UpdateIngredientDto } from './update-ingredient.dto';

export class GetIngredientDto extends UpdateIngredientDto {
  _id: string;
  createdAt: string;
}
