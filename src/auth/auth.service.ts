import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/routes/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ){}

    async validateUser(username: string, password: string){
        const user = await this.userService.getUserByUsername(username);
        
        if(user) {
            const match = await compare(password, user.password);
            if(match) {
                return user;
            }else {
                return null;
            }
        } 

        return null;
    }
}
