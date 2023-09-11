export interface ShopifyProductPayload {
    id: bigint;
    title: string;
    product_type: string;
    created_at: string;
    image: {
        src: string;
    };
}
