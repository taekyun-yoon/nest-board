import { ApiProperty } from "@nestjs/swagger";

export class UpdateBoardDto {   
    @ApiProperty({
        description: '내용',
        required: true,
        example: '안녕하세요'
    })
    contents: string;
}