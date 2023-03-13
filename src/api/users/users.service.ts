import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './users.entity';
import { Errors } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw Errors.notFound('User');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);

    if (!user) throw Errors.notFound('User');
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove(id);

    if (!user) throw Errors.notFound('User');
    return user;
  }
}
