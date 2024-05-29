import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength, isNotEmpty } from "class-validator";

export class CreateBoardDto {
    @MinLength(2)
    @MaxLength(28)
    @IsNotEmpty()
    @ApiProperty({
        description: '이름',
        required: true,
        example: '홍길동'
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        description: '내용',
        required: true,
        example: '안녕하세요'
    })
    content: string;
}