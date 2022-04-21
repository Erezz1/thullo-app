import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { BoardService } from '../services';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor( private readonly boardService: BoardService ) {}

    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { _id: userId } = request.user;
        const { boardId } = request.params;

        const { admins } = await this.boardService.findBoardById( boardId );

        const isAdmin = admins.includes( userId );
        if ( !isAdmin ) {
            throw new UnauthorizedException('No tienes permisos para realizar esta acción');
        }

        return true;
    }
}
