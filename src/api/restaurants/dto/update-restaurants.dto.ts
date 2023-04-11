import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantsDto } from './create-restaurants.dto';

export class UpdateRestaurantsDto extends PartialType(CreateRestaurantsDto) {}
