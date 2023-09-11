import { DateRangeDto } from './../dtos/date-range.dto';
import { ProductPayload } from '../interfaces/product-payload';
import { ProductLinkDto } from '../dtos/product-link.dto';

export interface IProductService {
    upsert(dateRangeDto: DateRangeDto): Promise<any>;
    crawlCreate(productLink: ProductLinkDto): Promise<any>;
    findAll(): Promise<any>;
    findById(id: string): Promise<ProductPayload>;
}

export const IProductService = Symbol('IProductService');
