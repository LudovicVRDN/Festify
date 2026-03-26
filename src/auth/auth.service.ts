import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { role } from "prisma/generated/prisma/enums";

import { signInDTO } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(
        signInDTO:signInDTO,
    ): Promise<{ access_token: string }> {
        const countUser = await this.userService.countByEmail(signInDTO.email);
        if (countUser) throw new ConflictException('Cette adresse EMail est déja utilisée');
        const createUserDTO :CreateUserDto ={
            email: signInDTO.email,
            password: signInDTO.password,
            is_validated : false,
            role : signInDTO.role
        } 
        const user = await this.userService.create(createUserDTO);
        const payload = { sub: user.id, userEmail: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async logIn(
        userEmail: string,
        userPassword: string
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(userEmail);
        const isValid = user && await bcrypt.compare(userPassword, user.password)
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, userEmail: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
