import { Model } from 'mongoose';
import { Errors, FindUtils, IQuery } from '.';

interface IProps {
  model: Model<any>;
  data?: any;
  id?: string;
  dto?: any;
  error?: string;
  query?: IQuery;
  findParams?: any;
}

class MongoUtils {
  async getAll({ model, dto, query }: IProps) {
    const all = await FindUtils.getAllWithQuery(model, query, dto);
    return all;
  }

  async get({ model, id, dto, error }: IProps) {
    const item = await model.findById(id);

    if (!item) throw Errors.notFound(error);
    return dto ? await item.populate(Object.keys(new dto())) : item;
  }

  async create({ model, findParams, data, dto, error }: IProps) {
    const item = await model.findOne(findParams);

    if (item) throw Errors.badRequest(error);
    const newItem = await model.create({ ...data, createdAt: Date.now() });

    return dto ? await newItem.populate(Object.keys(new dto())) : newItem;
  }

  async update({ model, id, data, dto, error }: IProps) {
    const item = await model.findByIdAndUpdate(id, data);

    if (!item) throw Errors.notFound(error);
    return dto ? await item.populate(Object.keys(new dto())) : item;
  }

  async delete({ model, id, error }: IProps) {
    const item = await model.findByIdAndRemove(id);

    if (!item) throw Errors.notFound(error);
    return item._id;
  }
}

export default new MongoUtils();
