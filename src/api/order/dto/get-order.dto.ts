export class GetOrderDto {
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
  _id: string;
  createdAt: number;
  archivedAt?: number;

  constructor(model: GetOrderDto) {
    this.price = model?.price;
    this.discount = model?.discount;
    this.tips = model?.tips;
    this.delivery = model?.delivery;
    this.deliveryTime = model?.deliveryTime;
    this.paymentsType = model?.paymentsType;
    this.status = model?.status;
    this.comment = model?.comment;
    this.products = model?.products;
    this.authorId = model?.authorId;
    this._id = model?._id;
    this.createdAt = model?.createdAt;
    this.archivedAt = model?.archivedAt;
  }
}
