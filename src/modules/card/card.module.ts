import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListModule } from '../list/list.module';
import { ValidateListMiddleware } from '../list/middleware';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { ValidateCardMiddleware } from './middlewares';
import { Card, CardSchema } from './schema/card.schema';

@Module({
    imports: [
        ListModule,
        MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])
    ],
    controllers: [ CardController ],
    providers: [ CardService ],
})

export class CardModule implements NestModule {
    configure( consumer: MiddlewareConsumer ) {
        consumer
            .apply( ValidateListMiddleware )
            .forRoutes(
                {
                    path: 'card/create',
                    method: RequestMethod.POST,
                },
                {
                    path: 'card/:cardId',
                    method: RequestMethod.DELETE,
                }
            );

        consumer
            .apply( ValidateCardMiddleware )
            .exclude({ path: 'card/create', method: RequestMethod.POST })
            .forRoutes( CardController );
    }
}
