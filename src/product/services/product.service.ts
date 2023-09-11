import { DateRangeDto } from './../dtos/date-range.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductPayload } from '../interfaces/product-payload';
import { IShopifyService } from 'src/shopify/services/shopify.interface';
import { ProductLinkDto } from '../dtos/product-link.dto';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(IShopifyService) private readonly shopifyService: IShopifyService,
    ) {}

    async findAll(): Promise<any> {
        return await this.prisma.product.findMany();
    }

    async findById(id: string): Promise<ProductPayload> {
        return await this.prisma.product.findUniqueOrThrow({ where: { id } });
    }

    async upsert({ begin, end }: DateRangeDto): Promise<ProductPayload> {
        const products = await this.shopifyService.findAll(begin, end);

        return products;
    }

    async crawlCreate(productLink: ProductLinkDto): Promise<any> {}
}
