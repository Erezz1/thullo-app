import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardController, MemberController } from './controllers';
import { BoardService, MemberService } from './services';
import { ValidateBoardMiddleware } from './middlewares';
import { Board, BoardSchema } from './schema/board.schema';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    ],
    controllers: [ BoardController, MemberController ],
    providers: [ BoardService, MemberService ],
})

export class BoardModule implements NestModule {
    configure( consumer: MiddlewareConsumer ) {
        consumer
            .apply( ValidateBoardMiddleware )
            .exclude( { path: 'board/create', method: RequestMethod.POST } )
            .forRoutes( BoardController, MemberController );
    }
}
