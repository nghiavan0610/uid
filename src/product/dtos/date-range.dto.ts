import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDto {
    @IsDateString()
    @IsOptional()
    begin: Date;

    @IsDateString()
    @IsOptional()
    end: Date;
}
