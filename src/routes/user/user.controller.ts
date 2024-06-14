import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    signup(){

    }

    login(){

    }

    @Get()
    getUser(){
        return this.userService.getUser();
    }
}
