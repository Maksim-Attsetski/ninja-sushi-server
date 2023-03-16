import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Errors, IQuery, MongoUtils } from 'src/utils';

import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create({ article, ...other }: CreateProductDto) {
    return await MongoUtils.create({
      model: this.productModel,
      data: { ...other, article },
      findParams: { article },
      error: 'Product with this article already exist',
      dto: GetProductDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.productModel,
      query,
      dto: GetProductDto,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.productModel,
      id,
      error: 'Product',
      dto: GetProductDto,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await MongoUtils.update({
      model: this.productModel,
      id,
      data: updateProductDto,
      dto: GetProductDto,
      error: 'Product',
    });
  }

  async remove(id: string) {
    return await MongoUtils.delete({
      model: this.productModel,
      id,
      error: 'Product',
    });
  }
}
