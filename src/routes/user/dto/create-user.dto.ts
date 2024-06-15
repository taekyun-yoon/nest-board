import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        description: '회원 아이디',
        required: true,
        example: 'admin'
    })
    username: string;

    @MinLength(8)
    @IsNotEmpty()
    @ApiProperty({
        description: '비밀번호',
        required: true,
        example: 'password'
    })
    password: string;

    @MinLength(2)
    @IsNotEmpty()
    @ApiProperty({
        description: '이름',
        required: true,
        example: '홍길동'
    })
    name: string;

}