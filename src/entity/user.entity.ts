import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
// import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: '유저 아이디', example: 'admin' })
    @Column({unique: true})
    username: string;
    
    @ApiProperty({ description: '비밀번호' })
    @Column()
    // @Exclude()
    password: string;
    
    @ApiProperty({ description: '이름' })
    @Column()
    name: string;

    @ApiProperty({ description: '작성한 게시글' })
    @OneToMany(() => Board, (board) => board.user)
    boards?: Board[];
    
    @Column({select: false, update: false, insert: false, nullable: true})
    boardCount?: number;
}