import { DateRangeDto } from './../dtos/date-range.dto';
import { ProductPayload } from '../interfaces/product-payload';

export interface IProductService {
    upsert(dateRangeDto: DateRangeDto): Promise<any>;
    // findAll(): Promise<ProductPayload[]>;
    findAll(): Promise<any>;
    findById(id: string): Promise<ProductPayload>;
}

export const IProductService = Symbol('IProductService');
