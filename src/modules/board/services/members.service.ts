import { BadRequestException, Injectable } from '@nestjs/common';

import { BoardService } from './board.service';

@Injectable()
export class MemberService {

    constructor( private readonly boardService: BoardService ) {}

    async addMember( boardId: string, userId: string ): Promise<any> {

        const board = await this.boardService.findBoardById( boardId );
        const { members } = board;

        const userIsMember = members.includes( userId );
        if ( userIsMember ) {
            throw new BadRequestException('El usuario ya es miembro del tablero');
        }

        const boardUpdated = await this.boardService.updateBoard( boardId, {
            $push: {
                members: userId,
            },
        });

        return boardUpdated;
    }

    async removeMember( boardId: string, userId: string ): Promise<any> {

        const board = await this.boardService.findBoardById( boardId );
        const { members } = board;

        const userIsMember = members.includes( userId );
        if ( !userIsMember ) {
            throw new BadRequestException('El usuario no es miembro del tablero');
        }

        const boardUpdated = await this.boardService.updateBoard( boardId, {
            $pull: {
                members: userId,
                admins: userId,
            },
        });

        return boardUpdated;
    }

    async addAdmin( boardId: string, userId: string ): Promise<any> {

        const board = await this.boardService.findBoardById( boardId );
        const { admins, members  } = board;

        const userIsMember = members.includes( userId );
        if ( !userIsMember ) {
            throw new BadRequestException('El usuario no es miembro del tablero');
        }

        const userIsAdmin = admins.includes( userId );
        if ( userIsAdmin ) {
            throw new BadRequestException('El usuario ya es administrador del tablero');
        }

        const boardUpdated = await this.boardService.updateBoard( boardId, {
            $push: {
                admins: userId,
            },
        });

        return boardUpdated;
    }

    async removeAdmin( boardId: string, userId: string ): Promise<any> {

        const board = await this.boardService.findBoardById( boardId );
        const { admins, members } = board;

        const userIsMember = members.includes( userId );
        if ( !userIsMember ) {
            throw new BadRequestException('El usuario no es miembro del tablero');
        }

        const userIsAdmin = admins.includes( userId );
        if ( !userIsAdmin ) {
            throw new BadRequestException('El usuario no es administrador del tablero');
        }

        const boardUpdated = await this.boardService.updateBoard( boardId, {
            $pull: {
                admins: userId,
            },
        });

        return boardUpdated;
    }
}
