import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ExistUserMiddleware, ValidatePasswordMiddleware } from './middlewares';
import { JwtStrategy } from './jwt.strategy';
import { JWT_SECRET } from '../../constants';
import { JwtAuthGuard } from './guards';

@Module({
  imports: [ 
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
  ], 

  controllers: [ AuthController ],

  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})

export class AuthModule implements NestModule {

  configure( consumer: MiddlewareConsumer ) {
    consumer
      .apply(
        ExistUserMiddleware,
        ValidatePasswordMiddleware
      )
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
