import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
;
import { signInDTO } from './dto/registe.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async compare(
        password:string,
        userPassword: string
    ): Promise<boolean>{
         return await bcrypt.compare(password,userPassword)
    }


}
