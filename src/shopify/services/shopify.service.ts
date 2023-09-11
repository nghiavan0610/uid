import { Injectable } from '@nestjs/common';
import { IShopifyService } from './shopify.interface';
import Shopify from 'shopify-api-node';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';

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

    async findAll(begin: Date, end: Date): Promise<any> {
        let products = [];
        let sinceId = null;

        while (true) {
            const sinceIdMaybe = sinceId ? { since_id: sinceId } : {};
            const response = await this.shopifyClient.product.list({
                created_at_min: `${begin}T00:00:00-07:00`,
                created_at_max: `${end}T23:59:59-07:00`,
                order: 'created_at asc',
                limit: 250,
                // since_id: sinceId,
                ...sinceIdMaybe,
            });

            products = products.concat(response);

            console.log(response.length, response?.slice(-1)[0]?.id);

            if (!response.length) break;

            sinceId = response.slice(-1)[0].id;

            console.log(sinceId);
        }

        const dates = {};

        products.forEach((product) => {
            const date = product.created_at.split('T')[0];

            dates[date] = dates[date] ? dates[date] + 1 : 1;
        });

        return Object.entries(dates).map(([date, count]) => ({
            [date]: count,
        }));
    }
}
