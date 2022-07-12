import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { BoardService } from '../services';
import { CreateBoardDto, UpdateBoardDto } from '../dto';
import { AdminGuard, MemberGuard } from '../guards';
import { createBoardPayload, boardResponse } from '../interfaces';

@Controller('board')
export class BoardController {

    constructor( private readonly boardService: BoardService ) {}

    @Get('/find/:boardId')
    @UseGuards( MemberGuard )
    async findBoard(@Param('boardId') boardId: string ): Promise<boardResponse> {
        const boardFound = await this.boardService.findBoardById( boardId );

        const boardResponse: boardResponse = {
            id: boardFound._id,
            name: boardFound.name,
            cover: boardFound.cover,
            members: boardFound.members,
            lists: boardFound.lists,
            description: boardFound.description,
            admins: boardFound.admins,
        }

        return boardResponse;
    }

    @Post('/create')
    async createBoard(
        @Body() board: CreateBoardDto,
        @Request() req: any,
    ): Promise<boardResponse> {

        const { _id: userId } = req.user;

        const createBoardPayload: createBoardPayload = {
            ...board,
            members: [ userId ],
            admins: [ userId ],
        }

        const boardCreated = await this.boardService.createBoard( userId, createBoardPayload );

        const boardResponse: boardResponse = {
            id: boardCreated._id,
            name: boardCreated.name,
            cover: boardCreated.cover,
            members: boardCreated.members,
            lists: boardCreated.lists,
            description: boardCreated.description,
            admins: boardCreated.admins,
        }

        return boardResponse;
    }

    @Put('/update/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async updateNameBoard(
        @Param('boardId') boardId: string,
        @Body() board: UpdateBoardDto,
    ): Promise<boardResponse> {
        const { name, description } = board;
        const boardUpdated = await this.boardService.updateNameBoard( boardId, name, description );

        const boardResponse: boardResponse = {
            id: boardUpdated._id,
            name: boardUpdated.name,
            cover: boardUpdated.cover,
            members: boardUpdated.members,
            lists: boardUpdated.lists,
            description: boardUpdated.description,
            admins: boardUpdated.admins,
        }

        return boardResponse;
    }

    @Delete('/delete/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async deleteBoard(@Param('boardId') boardId: string ): Promise<{ message: string }> {
        const message = await this.boardService.deleteBoard( boardId );
        return { message };
    }
}
