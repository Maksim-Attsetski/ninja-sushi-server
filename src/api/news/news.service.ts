import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IQuery, MongoUtils } from 'src/utils';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Model } from 'mongoose';
import { News, newsDocument } from './news.entity';
import { GetNewsDto } from './dto/get-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<newsDocument>) {}

  async create(createNewsDto: CreateNewsDto) {
    return await MongoUtils.create({
      model: this.newsModel,
      data: createNewsDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.newsModel,
      dto: GetNewsDto,
      query,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.newsModel,
      error: 'News',
      id,
      dto: GetNewsDto,
    });
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    return await MongoUtils.update({
      model: this.newsModel,
      error: 'News',
      id,
      data: updateNewsDto,
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.newsModel,
      error: 'News',
      id,
    });
  }
}
