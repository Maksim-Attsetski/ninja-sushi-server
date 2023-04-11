import { Injectable } from '@nestjs/common';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantsDto } from './dto/update-restaurants.dto';
import { Errors, IQuery, MongoUtils } from 'src/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurants, restaurantsDocument } from './restaurants.entity';
import { Model } from 'mongoose';
import { GetRestaurantsDto } from './dto/get-restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurants.name)
    private restaurantsModel: Model<restaurantsDocument>,
  ) {}
  async create(createRestaurantsDto: CreateRestaurantsDto) {
    return await MongoUtils.create({
      model: this.restaurantsModel,
      data: createRestaurantsDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.restaurantsModel,
      dto: GetRestaurantsDto,
      query,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.restaurantsModel,
      error: 'Restaurant',
      id,
      dto: GetRestaurantsDto,
    });
  }

  async update(id: string, updateRestaurantsDto: UpdateRestaurantsDto) {
    return await MongoUtils.update({
      model: this.restaurantsModel,
      error: 'Restaurant',
      id,
      data: updateRestaurantsDto,
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.restaurantsModel,
      error: 'Restaurant',
      id,
    });
  }
}
