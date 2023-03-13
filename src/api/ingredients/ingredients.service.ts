import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IQuery, MongoUtils } from 'src/utils';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { GetIngredientDto } from './dto/get-ingredient.dto';
import { Ingredient, IngredientDocument } from './ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(data: CreateIngredientDto) {
    return await MongoUtils.create(
      this.ingredientModel,
      data,
      data,
      'Ingredient with this name already exist',
    );
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll(
      this.ingredientModel,
      query,
      GetIngredientDto,
    );
  }

  async findOne(id: string) {
    return await MongoUtils.get(this.ingredientModel, id, 'Ingredient');
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    return await MongoUtils.update(
      this.ingredientModel,
      id,
      updateIngredientDto,
      'Ingredient',
    );
  }

  async remove(id: string) {
    return await MongoUtils.delete(this.ingredientModel, id, 'Ingredient');
  }
}
