import { Injectable } from '@nestjs/common';
import { IUtilService } from './util.interface';
import { ShopifyProductPayload } from 'src/shopify/interfaces/shopify-product.interface';
import { ProductCountByDate } from 'src/product/interfaces/product-count-by-date.interface';
import { ProductPayload } from 'src/product/interfaces/product-payload.interface';

@Injectable()
export class UtilService implements IUtilService {
    countProductsByDate(products: ShopifyProductPayload[]): ProductCountByDate[] {
        const dates: ProductCountByDate[] = [];

        products.forEach((product) => {
            const date = product.created_at.split('T')[0];

            let dateObj = dates.find((d) => d.date === date);

            if (!dateObj) {
                dateObj = {
                    date,
                    numOfProducts: 0,
                    productIds: [],
                };

                dates.push(dateObj);
            }

            dateObj.numOfProducts++;
            dateObj.productIds.push(product.id);
        });

        return dates;
    }

    mapProductData(product: ShopifyProductPayload): ProductPayload {
        return {
            id: product.id,
            title: product.title,
            productType: product.product_type,
            createdDate: product.created_at.split('T')[0],
            imageUrl: product?.image?.src,
        };
    }
}
