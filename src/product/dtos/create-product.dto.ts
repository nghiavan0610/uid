import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    title: string;

    productType: string;
    imageUrl: string;
    // createdDate: Date;
}
