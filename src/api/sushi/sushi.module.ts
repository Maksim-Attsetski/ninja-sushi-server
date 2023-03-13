import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SushiService } from './sushi.service';
import { SushiController } from './sushi.controller';
import { Sushi, SushiSchema } from './sushi.entity';

const SushiModel = MongooseModule.forFeature([
  { name: Sushi.name, schema: SushiSchema },
]);

@Module({
  imports: [SushiModel],
  controllers: [SushiController],
  providers: [SushiService],
})
export class SushiModule {}
