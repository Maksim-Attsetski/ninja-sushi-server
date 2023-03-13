import { Injectable } from '@nestjs/common';
import { CreateSushiDto } from './dto/create-sushi.dto';
import { UpdateSushiDto } from './dto/update-sushi.dto';

@Injectable()
export class SushiService {
  create(createSushiDto: CreateSushiDto) {
    return 'This action adds a new sushi';
  }

  findAll() {
    return `This action returns all sushi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sushi`;
  }

  update(id: number, updateSushiDto: UpdateSushiDto) {
    return `This action updates a #${id} sushi`;
  }

  remove(id: number) {
    return `This action removes a #${id} sushi`;
  }
}
