import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { signInDTO } from './dto/registe.dto';
import type { Response } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async compare(
        password: string,
        userPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, userPassword)
    }

    async createToken(userID: number, userRole: string): Promise<{ access_token: string, refresh_token: string }> {
        const payload = {
            sub: userID,
            role: userRole
        }
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.refresh_expire ?? "7d" as any,
            algorithm: process.env.JWTAlgorithm ?? "HS512" as any,
            secret: process.env.refresh_token as any

        });
        return {
            access_token,
            refresh_token
        }
    }
    async verifyToken(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_ACCESS_SECRET,
        });

        return payload
    }
    async instertIntoCookies(token:string,cookieName:string,response:Response, option? : {maxAge: number; }){
        response.cookie(cookieName,token,{
            ...option,
            secure: false, //TODO : a changer en prod
            httpOnly: true,
            sameSite: 'lax',
            path: "/"
            //signed: true,
            // domain: "shop.mon_nom_de_domaine.fr"
        })
        
    }

 
}
