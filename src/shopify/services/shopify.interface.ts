export interface IShopifyService {
    findAll(begin: Date, end: Date): Promise<any>;
}

export const IShopifyService = Symbol('IShopifyService');
