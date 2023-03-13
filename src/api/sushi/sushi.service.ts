import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IQuery, MongoUtils } from 'src/utils';

import { CreateSushiDto } from './dto/create-sushi.dto';
import { GetSushiDto } from './dto/get-sushi.dto';
import { UpdateSushiDto } from './dto/update-sushi.dto';
import { Sushi, SushiDocument } from './sushi.entity';

@Injectable()
export class SushiService {
  constructor(
    @InjectModel(Sushi.name) private sushiModel: Model<SushiDocument>,
  ) {}

  async create({ article, ...other }: CreateSushiDto) {
    return await MongoUtils.create(
      this.sushiModel,
      { ...other, article },
      { article },
      'Sushi',
    );
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll(this.sushiModel, query, GetSushiDto);
  }

  async findOne(id: string) {
    return await MongoUtils.get(this.sushiModel, id, 'Sushi');
  }

  async update(id: string, updateSushiDto: UpdateSushiDto) {
    return await MongoUtils.update(
      this.sushiModel,
      id,
      updateSushiDto,
      'Sushi',
    );
  }

  async remove(id: string) {
    return await MongoUtils.delete(this.sushiModel, id, 'Sushi');
  }
}
