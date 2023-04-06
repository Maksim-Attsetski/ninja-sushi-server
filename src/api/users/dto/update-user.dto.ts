import { ILocation } from '../users.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  favorite_products_ids: string[];
  phone: string;
  location: ILocation;
}
