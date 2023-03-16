export class CreateOrderDto {
  price: number;
  discount?: number;
  tips?: number;
  delivery: boolean;
  deliveryTime: number;
  paymentsType: string;
  status: string;
  comment: string;
  products: string[];
  authorId: string;
}
