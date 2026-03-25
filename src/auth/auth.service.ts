import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService:userService,
        private jwtService: JwtService,
    ){}
    
    async signIn(
        userEmail:string,
        userPassword:string
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(userEmail);
        if(!user) throw new UnauthorizedException();
        if(! await bcrypt.compare(userPassword,user.password)){
            throw new UnauthorizedException();
        }
        const playload = {sub :user.id,userEmail: user.email}
        return {
            access_token : await this.jwtService.signAsync(playload)
        }
    }
    
}
