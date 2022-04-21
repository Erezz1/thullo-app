import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
    const app = await NestFactory.create( AppModule );

    app.useGlobalPipes( new ValidationPipe({
        transform: true, // ? Transforma a un objeto de la clase que el dto requiera
        whitelist: true, // ? Solo permite que los campos que sean requeridos sean enviados
        forbidNonWhitelisted: true, // ? No permite que se envien campos que no esten en el dto
    }));

    await app.listen( AppModule.port );
    console.log('Server running on port:', AppModule.port);
}

bootstrap();
