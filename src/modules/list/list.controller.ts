import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ListService } from './list.service';
import { ChangeCardsPositionDto, CreateListDto, DeleteListDto, UpdateListDto } from './dto';
import { ListResponse } from './interfaces';

@Controller('list')
export class ListController {

    constructor(
        private readonly listService: ListService,
    ) {}

    @Get('/:listId')
    async findList(@Param('listId') listId: string ): Promise<ListResponse> {
        const listFound = await this.listService.getListById( listId );

        const ListResponse: ListResponse = {
            id: listFound._id,
            name: listFound.name,
            cards: listFound.cards,
        }
        return ListResponse;
    }

    @Post('/create')
    async createList(@Body() newList: CreateListDto ): Promise<ListResponse> {
        const { boardId, name } = newList;
        const listCreated = await this.listService.createList( name, boardId );

        const ListResponse: ListResponse = {
            id: listCreated._id,
            name: listCreated.name,
            cards: listCreated.cards,
        }
        return ListResponse;
    }

    @Put('/:listId')
    async updateList(
        @Param('listId') listId: string,
        @Body() list: UpdateListDto
    ): Promise<ListResponse> {
        const { name } = list;
        const listUpdated = await this.listService.updateList( listId, name );

        const ListResponse: ListResponse = {
            id: listUpdated._id,
            name: listUpdated.name,
            cards: listUpdated.cards,
        }
        return ListResponse;
    }

    @Put('/cards/:listId')
    async changeCardsPosition(
        @Param('listId') listId: string,
        @Body() body: ChangeCardsPositionDto
    ): Promise<ListResponse> {
        const { cards } = body;
        const listUpdated = await this.listService.changeCardsPosition( listId, cards );

        const listResponse: ListResponse = {
            id: listUpdated._id,
            name: listUpdated.name,
            cards: listUpdated.cards,
        }
        return listResponse;
    }


    @Delete('/:listId')
    async deleteList(
        @Param('listId') listId: string,
        @Body() list: DeleteListDto
    ): Promise<{ message: string }> {
        const { boardId } = list;
        const message = await this.listService.deleteList( listId, boardId );

        return { message };
    }
}