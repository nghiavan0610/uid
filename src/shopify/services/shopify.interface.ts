import { ShopifyProductPayload } from '../interfaces/shopify-product.interface';

export interface IShopifyService {
    getProductsByDateRange(begin: Date, end: Date): Promise<ShopifyProductPayload[]>;
    createProduct(product: ShopifyProductPayload): Promise<void>;
}

export const IShopifyService = Symbol('IShopifyService');
