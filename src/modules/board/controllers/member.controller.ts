import { BadRequestException, Body, Controller, Delete, Param, Put, Request, UseGuards } from '@nestjs/common';

import { AddMemberDto, RemoveMemberDto } from '../dto';
import { AdminGuard, MemberGuard } from '../guards';
import { boardResponse } from '../interfaces';
import { MemberService } from '../services';

@Controller('board/member')
export class MemberController {

    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Put('/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async addMember(
        @Param('boardId') boardId: string,
        @Body() newMember: AddMemberDto
    ): Promise<boardResponse> {
        const { userId } = newMember;
        const boardUpdated = await this.memberService.addMember( boardId, userId );

        const boardResponse: boardResponse = {
            id: boardUpdated._id,
            name: boardUpdated.name,
            cover: boardUpdated.cover,
            members: boardUpdated.members,
            lists: boardUpdated.lists,
        }

        return boardResponse;
    }

    @Delete('/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async removeMember(
        @Param('boardId') boardId: string,
        @Body() member: RemoveMemberDto,
        @Request() req: any
    ): Promise<boardResponse> {
        const { userId } = member;
        const { _id: adminId } = req.user;

        if ( userId === adminId.toString() ) {
            throw new BadRequestException('No puedes eliminarte a ti mismo');
        }

        const boardUpdated = await this.memberService.removeMember( boardId, userId );

        const boardResponse: boardResponse = {
            id: boardUpdated._id,
            name: boardUpdated.name,
            cover: boardUpdated.cover,
            members: boardUpdated.members,
            lists: boardUpdated.lists,
        }

        return boardResponse;
    }

    @Put('/admin/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async addAdmin(
        @Param('boardId') boardId: string,
        @Body() newAdmin: AddMemberDto
    ): Promise<boardResponse> {
        const { userId } = newAdmin;
        const boardUpdated = await this.memberService.addAdmin( boardId, userId );

        const boardResponse: boardResponse = {
            id: boardUpdated._id,
            name: boardUpdated.name,
            cover: boardUpdated.cover,
            members: boardUpdated.members,
            lists: boardUpdated.lists,
        }

        return boardResponse;
    }

    @Delete('/admin/:boardId')
    @UseGuards( MemberGuard )
    @UseGuards( AdminGuard )
    async removeAdmin(
        @Param('boardId') boardId: string,
        @Body() admin: RemoveMemberDto,
        @Request() req: any
    ): Promise<boardResponse> {
        const { userId } = admin;
        const { _id: adminId } = req.user;

        if ( userId === adminId.toString() ) {
            throw new BadRequestException('No puedes eliminarte a ti mismo');
        }

        const boardUpdated = await this.memberService.removeAdmin( boardId, userId );

        const boardResponse: boardResponse = {
            id: boardUpdated._id,
            name: boardUpdated.name,
            cover: boardUpdated.cover,
            members: boardUpdated.members,
            lists: boardUpdated.lists,
        }

        return boardResponse;
    }
}
