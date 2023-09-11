export interface IShopifyService {
    findAll(begin: Date, end: Date): Promise<any>;
    // findAll(): Promise<any>;
}

export const IShopifyService = Symbol('IShopifyService');
