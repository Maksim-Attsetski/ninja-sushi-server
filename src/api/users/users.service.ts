import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { MongoUtils, IQuery } from 'src/utils';

import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Users, UsersDocument } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.userModel,
      query,
      dto: GetUserDto,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.userModel,
      id,
      error: 'User',
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await MongoUtils.update({
      model: this.userModel,
      id,
      data: updateUserDto,
      dto: GetUserDto,
      error: 'User',
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.userModel,
      id,
      error: 'User',
    });
  }
}
