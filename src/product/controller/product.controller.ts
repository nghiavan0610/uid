import { Controller, Inject, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { IProductService } from '../services/product.interface';
import { DateRangeDto } from '../dtos/date-range.dto';
import { ProductLinkDto } from '../dtos/product-link.dto';
import { ProductIdPayload } from '../interfaces/product-id-payload.interface';

@Controller('products')
export class ProductController {
    constructor(@Inject(IProductService) private readonly productService: IProductService) {}

    @Post('upsert')
    @HttpCode(HttpStatus.CREATED)
    async upsert(@Body() dateRangeDto: DateRangeDto): Promise<any> {
        return await this.productService.upsert(dateRangeDto);
    }

    @Post('crawl-create')
    @HttpCode(HttpStatus.CREATED)
    async crawlCreate(@Body() productLinkDto: ProductLinkDto): Promise<ProductIdPayload> {
        return await this.productService.crawlCreate(productLinkDto);
    }
}
