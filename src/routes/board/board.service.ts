/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
    private boards = [
        {
            id: 1,
            name: 'Inez Dooley',
            content: 'Content 1',
        },{
            id: 2,
            name: 'Bob Brown',
            content: 'Content 2',
        },{
            id: 3,
            name: 'Helliy Son',
            content: 'Content 3',
        },{
            id: 4,
            name: 'Kate lee',
            content: 'Content 4',
        },{
            id: 5,
            name: 'Olson Wang',
            content: 'Content 5',
        },{
            id: 6,
            name: 'Max Yoon',
            content: 'Content 6',
        },{
            id: 7,
            name: 'Jake Xeon',
            content: 'Content 7',
        },{
            id: 8,
            name: 'Sunny Rei',
            content: 'Content 8',
        },
    ];
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>
    ){}

    async findAll() {
        this.getNextId();
        return await this.boardRepository.find();
    }

    async find(id: number) {
        const board = await this.boardRepository.findOne({
            where: {
                id
            },
            relations: {
                user: true 
            }
        });

        if(!board) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);

        return board;
    }
    async create(data: CreateBoardDto) {
        return this.boardRepository.save(data);
    } 

    async update(userId: number, id: number, data: UpdateBoardDto) {
        const board = await this.getBoardById(id);

        if(!board) throw new HttpException('NOT_FOUNT', HttpStatus.NOT_FOUND);
        if(userId != board.userId) throw new UnauthorizedException();

        if(data.contents) {
            board.contents = data.contents;
            return this.boardRepository.update(id, {
                ...data
            });
        }else{
            return null;
        }
    }

    async delete(userId: number ,id: number) {
        const board = await this.getBoardById(id);
        if(userId != board.userId) throw new UnauthorizedException();
        return await this.boardRepository.remove(board);
    }

    getNextId(){
        return this.boards.sort((a,b) => (a.id - b.id))[0].id + 1;
    }
    async getBoardById(id: number)  {
        return await this.boardRepository.findOneBy({
            id,
        });
    }
}