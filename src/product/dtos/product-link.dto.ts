import { IsNotEmpty } from 'class-validator';

export class ProductLinkDto {
    @IsNotEmpty()
    link: string;
}
