import { Errors, FindUtils, IQuery } from '.';

class MongoUtils {
  async getAll(model: any, query: IQuery, dto: any) {
    const all = await FindUtils.getAllWithQuery(model, query, dto);
    return all;
  }

  async get(model: any, id: string, notFound: string) {
    const item = await model.findById(id);

    if (!item) throw Errors.notFound(notFound);
    return item;
  }

  async create(model: any, data: any, find: any, error: string) {
    const item = await model.findOne(find);

    if (item) throw Errors.badRequest(error);
    return await model.create({ ...data, createdAt: Date.now() });
  }

  async update(model: any, id: string, data: any, notFound: string) {
    const item = await model.findByIdAndUpdate(id, data);

    if (!item) throw Errors.notFound(notFound);
    return item;
  }

  async delete(model: any, id: string, notFound: string) {
    const item = await model.findByIdAndRemove(id);

    if (!item) throw Errors.notFound(notFound);
    return item;
  }
}

export default new MongoUtils();
