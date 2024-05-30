import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ApiProperty({ description: 'user_id'})
    @Column()
    userId: number;

    @ApiProperty({ description: '내용' })
    @Column()
    contents: string;

    @ApiProperty({ description: '수정일' })
    @Column()
    updateAt: Date;

    @ApiProperty({ description: '생성일' })
    @Column()
    createdAt: Date;

    @ApiProperty({ description: '유저 정보' })
    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}