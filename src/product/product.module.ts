import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './services/product.service';
import { IProductService } from './services/product.interface';
import { ShopifyModule } from 'src/shopify/shopify.module';

@Module({
    imports: [ShopifyModule],
    controllers: [ProductController],
    providers: [
        {
            provide: IProductService,
            useClass: ProductService,
        },
    ],
})
export class ProductModule {}
