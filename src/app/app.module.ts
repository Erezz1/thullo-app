import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { BoardModule } from '../modules/board/board.module';
import { ListModule } from 'src/modules/list/list.module';
import { AppController } from './app.controller';
import { CardModule } from 'src/modules/card/card.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot( process.env.DB_CONNECTION ),
        UserModule,
        AuthModule,
        BoardModule,
        ListModule,
        CardModule
    ],
    controllers: [ AppController ],
})

export class AppModule {
    static port: number | string;

    constructor( private readonly configService: ConfigService ) {
        AppModule.port = this.configService.get('PORT');
    }
};
