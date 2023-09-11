import { Injectable } from '@nestjs/common';
import { IShopifyService } from './shopify.interface';
import Shopify from 'shopify-api-node';
import { ConfigService } from '@nestjs/config';
import { ShopifyProductPayload } from '../interfaces/shopify-product.interface';

@Injectable()
export class ShopifyService implements IShopifyService {
    private shopifyClient: Shopify;

    constructor(readonly config: ConfigService) {
        this.shopifyClient = new Shopify({
            shopName: 'uidevify.myshopify.com',
            accessToken: config.get<string>('SHOPIFY_TOKEN'),
            apiVersion: '2023-07',
        });
    }

    async getProductsByDateRange(begin: Date, end: Date): Promise<ShopifyProductPayload[]> {
        let products = [];
        let sinceId = null;

        while (true) {
            const sinceIdMaybe = sinceId ? { since_id: sinceId } : { since_id: '0' };
            const response = await this.shopifyClient.product.list({
                ...sinceIdMaybe,
                created_at_min: `${begin}T00:00:00-07:00`,
                created_at_max: `${end}T23:59:59-07:00`,
                limit: 250,
                fields: 'id, title, product_type, created_at, image',
            });

            products = products.concat(response);

            if (!response.length) break;

            sinceId = response.slice(-1)[0].id;
        }

        return products;
    }

    async createProduct(product: ShopifyProductPayload): Promise<void> {
        const data = {
            id: product.id,
            title: product.title,
            product_type: product.product_type,
            created_at: product.created_at,
            image: {
                src: product.image.src,
            },
        };

        await this.shopifyClient.product.create(data);
    }
}
