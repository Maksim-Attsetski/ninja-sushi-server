import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductModule } from './product.module';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
export * from './product.entity';

export {
  ProductService,
  ProductController,
  ProductModule,
  // dto
  CreateProductDto,
  UpdateProductDto,
  GetProductDto,
};
