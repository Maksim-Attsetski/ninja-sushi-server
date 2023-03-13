import { UpdateSushiDto } from './update-sushi.dto';

interface ISushi {
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

export class GetSushiDto extends UpdateSushiDto implements ISushi {
  createdAt: number;
  _id: string;

  constructor(model: ISushi) {
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
