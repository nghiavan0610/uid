import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import ExceptionFilter from './exception/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);

    app.setGlobalPrefix(`api`);

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.use(helmet({ contentSecurityPolicy: config.get<string>('NODE_ENV') === 'production' ? undefined : false }));
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new ExceptionFilter(config));

    await app.listen(config.get<number>('NODE_DOCKER_PORT'), async () => {
        const port =
            config.get<string>('NODE_ENV') !== 'production'
                ? config.get<number>('NODE_DOCKER_PORT')
                : config.get<number>('NODE_LOCAL_PORT');

        console.log(`App is running on port ${port}`);
    });
}
bootstrap();
