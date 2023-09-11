import { Module } from '@nestjs/common';
import { IUtilService } from './services/util.interface';
import { UtilService } from './services/util.service';

@Module({
    providers: [
        {
            provide: IUtilService,
            useClass: UtilService,
        },
    ],
    exports: [IUtilService],
})
export class UtilModule {}
