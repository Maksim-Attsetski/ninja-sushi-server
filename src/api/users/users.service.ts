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
    return await MongoUtils.getAll(this.userModel, query, GetUserDto);
  }

  async findOne(id: string) {
    return await MongoUtils.get(this.userModel, id, 'User');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await MongoUtils.update(this.userModel, id, updateUserDto, 'User');
  }

  async remove(id: string) {
    return await MongoUtils.delete(this.userModel, id, 'User');
  }
}
