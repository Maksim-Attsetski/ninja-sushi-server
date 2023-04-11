import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsModule } from './restaurants.module';

import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { UpdateRestaurantsDto } from './dto/update-restaurants.dto';
import { GetRestaurantsDto } from './dto/get-restaurants.dto';
export * from './restaurants.entity';

export {
  RestaurantsService,
  RestaurantsController,
  RestaurantsModule,
  // dto
  GetRestaurantsDto,
  CreateRestaurantsDto,
  UpdateRestaurantsDto,
};
