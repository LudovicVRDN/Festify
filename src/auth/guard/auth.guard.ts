
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //Recupère l'onjet requête HTTP
        const request :Request = context.switchToHttp().getRequest();
        //Extrait le token
        const token = this.extractTokenFromHeader(request);
        //Si pas de token retourne une 401
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            //Vérifie la clé secrète
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    algorithms:['HS512'],
                    secret: process.env.access_token
                }
            );
            //Si valide retourne le playload qu'on attacheà request['user']
            request['user'] = payload.sub;
            
        } catch {
            //Si pas valide ou expiré renvoie une 401
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        //le .split sert à découper 'bearer',token=".." , le ??[] évite le crash si le header est absent
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        //On ne retourne le token que si il  est de type bearer sinon il est undifined 
        return type === 'Bearer' ? token : undefined;
    }
}
