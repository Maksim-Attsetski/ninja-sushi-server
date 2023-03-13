import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  favorite_sushi_ids: string[];
  phone: string;
  order: string[];
}
