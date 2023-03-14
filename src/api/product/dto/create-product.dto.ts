import { TProductType } from '..';

export class CreateProductDto {
  name: string;
  article: string;
  description: string;
  preview: string;
  strengths: string[];
  weight: number;
  price: number;
  consist: string[];
  type: TProductType;
}
