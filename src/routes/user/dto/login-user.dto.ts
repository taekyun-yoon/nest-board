import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(8)
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
}