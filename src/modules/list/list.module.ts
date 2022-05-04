import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListController } from './list.controller';
import { ListService } from './list.service';
import { BoardModule } from '../board/board.module';
import { List, ListSchema } from './schema/list.schema';
import { ValidateBoardMiddleware } from '../board/middlewares';
import { ValidateListMiddleware } from './middleware';

@Module({
    imports: [
        BoardModule,
        MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    ],
    controllers: [ ListController ],
    providers: [
        ListService,
    ],
})

export class ListModule {
    configure( consumer: MiddlewareConsumer ) {
        consumer
            .apply( ValidateBoardMiddleware )
            .forRoutes(
                {
                    path: 'list/create',
                    method: RequestMethod.POST,
                },
                {
                    path: 'list/:listId',
                    method: RequestMethod.DELETE,
                }
            );

        consumer
            .apply( ValidateListMiddleware )
            .exclude({ path: 'list/create', method: RequestMethod.POST })
            .forRoutes( ListController );
    }
}
