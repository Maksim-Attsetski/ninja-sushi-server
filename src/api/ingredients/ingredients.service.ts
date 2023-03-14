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
    return await MongoUtils.create({
      model: this.ingredientModel,
      data,
      findParams: data,
      error: 'Ingredient with this name already exist',
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.ingredientModel,
      query,
      dto: GetIngredientDto,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.ingredientModel,
      id,
      error: 'Ingredient',
    });
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    return await MongoUtils.update({
      model: this.ingredientModel,
      id,
      data: updateIngredientDto,
      dto: GetIngredientDto,
      error: 'Ingredient',
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.ingredientModel,
      id,
      error: 'Ingredient',
    });
  }
}
