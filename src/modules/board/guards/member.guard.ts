import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { BoardService } from '../services';

@Injectable()
export class MemberGuard implements CanActivate {

    constructor( private readonly boardService: BoardService ) {}

    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { _id: userId } = request.user;
        const { boardId } = request.params;

        const { members } = await this.boardService.findBoardById( boardId );

        const isMember = members.includes( userId );
        if ( !isMember ) {
            throw new UnauthorizedException('No eres miembro de este tablero');
        }

        return true;
    }
}
