/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Ip } from 'src/decorators/ip.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('Board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ) {}

    @Get()
    findAll(@Ip() ip: string) {
        console.log(`${ip}`);
        return this.boardService.findAll();
    }

    @Get(':id')
    find(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @UserInfo() userInfo,
        @Body('contents') contents: string
    ) {
        if(!userInfo) throw new UnauthorizedException(); 

        return this.boardService.create({
            userId: userInfo.id,
            contents
        })
    }
    
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) data: UpdateBoardDto,
    ) {
        return this.boardService.update(userInfo.id, id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.delete(userInfo.id, id);
    }
}
