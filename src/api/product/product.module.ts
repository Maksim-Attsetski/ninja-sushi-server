import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.entity';

const ProductModel = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);

@Module({
  imports: [ProductModel],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
