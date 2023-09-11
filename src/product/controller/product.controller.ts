import { Controller, Inject, Get, HttpStatus, Param, HttpCode, Post, Body } from '@nestjs/common';
import { IProductService } from '../services/product.interface';
import { ProductPayload } from '../interfaces/product-payload';
import { DateRangeDto } from '../dtos/date-range.dto';

@Controller('products')
export class ProductController {
    constructor(@Inject(IProductService) private readonly productService: IProductService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTestById(@Param('id') id: string): Promise<ProductPayload> {
        return await this.productService.findById(id);
    }

    @Post('upsert')
    @HttpCode(HttpStatus.CREATED)
    async upsert(@Body() dateRangeDto: DateRangeDto): Promise<any> {
        return await this.productService.upsert(dateRangeDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<ProductPayload[]> {
        return await this.productService.findAll();
    }
}
