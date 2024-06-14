import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, MinLength, isNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: '작성자 아이다',
        required: true,
        example: '1'
    })
    userId: number;

    @IsNotEmpty()
    @ApiProperty({
        description: '내용',
        required: true,
        example: '안녕하세요'
    })
    contents: string;
}