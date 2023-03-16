import { UpdateIngredientDto } from './update-ingredient.dto';

export class GetIngredientDto extends UpdateIngredientDto {
  _id: string;
  createdAt: number;

  constructor(model: GetIngredientDto) {
    super();
    this._id = model?._id;
    this.createdAt = model?.createdAt;
    this.image = model?.image;
    this.name = model?.name;
  }
}
