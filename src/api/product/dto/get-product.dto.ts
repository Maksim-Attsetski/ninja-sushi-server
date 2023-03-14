import { UpdateProductDto } from './update-product.dto';

interface IProduct {
  name: string;
  article: string;
  description: string;
  preview: string;
  strengths: string[];
  consist: string[];
  weight: number;
  price: number;
  createdAt: number;
  _id: string;
}

export class GetProductDto extends UpdateProductDto implements IProduct {
  createdAt: number;
  _id: string;

  constructor(model: IProduct) {
    super();
    this.name = model?.name;
    this.article = model?.article;
    this.description = model?.description;
    this.preview = model?.preview;
    this.strengths = model?.strengths;
    this.consist = model?.consist;
    this.weight = model?.weight;
    this.price = model?.price;
    this.createdAt = model?.createdAt;
    this._id = model?._id;
  }
}
