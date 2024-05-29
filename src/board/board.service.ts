/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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
    findAll() {
        this.getNextId();
        return this.boards;
    }

    find(id: number) {
        const index = this.boards.findIndex(board => board.id === id);
        return this.boards[index];
    }
    create(data: CreateBoardDto) {
        const newBoard = { id: this.getNextId(), ...data};
        this.boards.push(newBoard);
        return newBoard;
    }

    update(id: number, data: UpdateBoardDto) {
        const idx = this.boards.findIndex((board) => board.id === id);
        if(idx > -1) {
            this.boards[idx] = {
                ...this.boards[idx],
                ...data,
            };
            return this.boards[idx];
        }
        return null;
    }

    delete(id: number) {
        const idx = this.boards.findIndex((board) => board.id === id);
        if(idx > -1) {
            const deleteBoard = this.boards[idx];
            this.boards.splice(idx, 1);
            return deleteBoard;
        }
        return null;
    }

    getNextId(){
        return this.boards.sort((a,b) => (a.id - b.id))[0].id + 1;
    }
}