import { DateRangeDto } from './../dtos/date-range.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { IShopifyService } from 'src/shopify/services/shopify.interface';
import { ProductCountByDate } from '../interfaces/product-count-by-date.interface';
import { IUtilService } from 'src/util/services/util.interface';
import { ProductIdPayload } from '../interfaces/product-id-payload.interface';
import { ProductLinkDto } from '../dtos/product-link.dto';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(IShopifyService) private readonly shopifyService: IShopifyService,
        @Inject(IUtilService) private readonly utilService: IUtilService,
    ) {}

    async upsert({ begin, end }: DateRangeDto): Promise<ProductCountByDate[]> {
        try {
            const products = await this.shopifyService.getProductsByDateRange(begin, end);

            const data = products.map((product) => this.utilService.mapProductData(product));
            await this.prisma.product.createMany({ data });

            return this.utilService.countProductsByDate(products);
        } catch (error) {
            console.error('error', error);
            throw error;
        }
    }

    async crawlCreate(productLinkDto: ProductLinkDto): Promise<ProductIdPayload> {
        const response = await fetch(productLinkDto.link);
        const { product } = await response.json();

        await this.prisma.$transaction(async (tx) => {
            const data = this.utilService.mapProductData(product);

            await Promise.all([this.shopifyService.createProduct(product), tx.product.create({ data })]);
        });

        return { productId: product.id };
    }
}
