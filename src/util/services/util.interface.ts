import { ProductCountByDate } from 'src/product/interfaces/product-count-by-date.interface';
import { ProductPayload } from 'src/product/interfaces/product-payload.interface';
import { ShopifyProductPayload } from 'src/shopify/interfaces/shopify-product.interface';

export interface IUtilService {
    countProductsByDate(products: ShopifyProductPayload[]): ProductCountByDate[];
    mapProductData(product: ShopifyProductPayload): ProductPayload;
}

export const IUtilService = Symbol('IUtilService');
