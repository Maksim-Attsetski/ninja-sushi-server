import { UpdateUserDto } from './update-user.dto';

export class GetUserDto extends UpdateUserDto {
  _id: string;
  createdAt: number;
  location: { latitude: number; longitude: number };
}
