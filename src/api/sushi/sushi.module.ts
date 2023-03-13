import { Module } from '@nestjs/common';
import { SushiService } from './sushi.service';
import { SushiController } from './sushi.controller';

@Module({
  controllers: [SushiController],
  providers: [SushiService]
})
export class SushiModule {}
