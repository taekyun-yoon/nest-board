import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateBoardDto {   
    @IsOptional()
    @ApiProperty({
        description: '내용',
        required: true,
        example: '안녕하세요'
    })
    contents?: string;
}