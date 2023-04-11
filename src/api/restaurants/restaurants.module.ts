import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurants, RestaurantsSchema } from './restaurants.entity';

const modelArr = [{ name: Restaurants.name, schema: RestaurantsSchema }];
const restaurantsModel = MongooseModule.forFeature(modelArr);

@Module({
  imports: [restaurantsModel],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
