import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class ExistEmailMiddleware implements NestMiddleware {

  constructor( private readonly userService: UserService ) {}

  async use( req: Request, res: Response, next: NextFunction ) {

    const { email } = req.body;
    const user = await this.userService.getUserByEmail( email );

    if ( user ) {
      throw new BadRequestException( 'El email ya está registrado' );
    }

    next();
  }
}
