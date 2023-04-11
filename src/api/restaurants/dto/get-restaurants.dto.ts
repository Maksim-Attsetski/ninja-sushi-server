import { PartialType } from '@nestjs/mapped-types';
import { UpdateRestaurantsDto } from './update-restaurants.dto';

export class GetRestaurantsDto extends PartialType(UpdateRestaurantsDto) {}

// export class GetUserDto extends UpdateUserDto {
//   _id: string;
//   createdAt: number;

//   constructor(model: GetUserDto) {
//     super();

//     this._id = model?._id;
//     this.avatar = model?.avatar;
//     this.createdAt = model?.createdAt;
//     this.email = model?.email;
//     this.favorite_products_ids = model?.favorite_products_ids;
//     this.location = model?.location;
//     this.name = model?.name;
//     this.password = model?.password;
//     this.phone = model?.phone;
//   }
// }
