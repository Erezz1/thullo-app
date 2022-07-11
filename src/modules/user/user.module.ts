import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { ExistEmailMiddleware,ValidateUserMiddleware } from './middlewares';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { JWT_SECRET } from '../../constants';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: '7d' }
        })
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ]
})

export class UserModule implements NestModule {

    configure( consumer: MiddlewareConsumer ) {
        consumer
            .apply( ExistEmailMiddleware )
            .forRoutes({ path: 'user/create', method: RequestMethod.POST });

        consumer
            .apply( ValidateUserMiddleware )
            .forRoutes({ path: 'user/:userId', method: RequestMethod.GET });
    }
}
