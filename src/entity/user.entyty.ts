import { ApiProperty } from "@nestjs/swagger";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ 
        description: '유저 아이디',
        example: 'admin'
    })
    @Column({unique: true})
    username: string;
    
    @ApiProperty({ 
        description: '비밀번호'
    })
    @Column({select: false})
    password: string;
    
    @ApiProperty({ 
        description: '이름'
    })
    @Column()
    name: string;
}