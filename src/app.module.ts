import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ShopifyModule } from './shopify/shopify.module';
import { UtilModule } from './util/util.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ProductModule, ShopifyModule, UtilModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
