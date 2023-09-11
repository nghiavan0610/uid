import { INestApplication, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(PrismaService.name);
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get<string>('DATABASE_URL'),
                },
            },
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'error' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
            ],
            errorFormat: 'colorless',
        });
    }

    async onModuleInit(): Promise<void> {
        this.$on('error', (event) => {
            this.logger.error(event);
        });
        this.$on('warn', (event) => {
            this.logger.warn(event);
        });
        this.$on('info', (event) => {
            this.logger.verbose(event);
        });
        this.$on('query', (event) => {
            this.logger.log(event);
        });

        await this.$connect();
        this.logger.log('DB connection established');
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
        this.logger.log('DB connection closed');
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
