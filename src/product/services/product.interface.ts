import { DateRangeDto } from './../dtos/date-range.dto';
import { ProductCountByDate } from '../interfaces/product-count-by-date.interface';
import { ProductIdPayload } from '../interfaces/product-id-payload.interface';
import { ProductLinkDto } from '../dtos/product-link.dto';

export interface IProductService {
    upsert(dateRangeDto: DateRangeDto): Promise<ProductCountByDate[]>;
    crawlCreate(productLinkDto: ProductLinkDto): Promise<ProductIdPayload>;
}

export const IProductService = Symbol('IProductService');
