import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  name: string;
  avatar: string;
}
