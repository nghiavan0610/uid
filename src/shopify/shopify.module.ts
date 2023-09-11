import { Module } from '@nestjs/common';
import { ShopifyService } from './services/shopify.service';
import { IShopifyService } from './services/shopify.interface';

@Module({
    providers: [
        {
            provide: IShopifyService,
            useClass: ShopifyService,
        },
    ],
    exports: [IShopifyService],
})
export class ShopifyModule {}
