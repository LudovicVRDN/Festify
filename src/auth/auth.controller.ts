import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, ConflictException, NotFoundException, UnauthorizedException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/registe.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/log-in.dto';
import { IResponse } from 'src/utils/IResponse.interface';
import { get, request } from 'http';
import type { Request, response, Response } from 'express';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) { }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto): Promise<string> {
    if (await this.userService.countByEmail(createUserDto.email)) throw new ConflictException('Cette adresse EMail est déja utilisée');
    const user = await this.userService.create(createUserDto);
    const payload = {
      sub: user.id,
      userRole : user.role
    }
    return "Ton compte est crée ! "
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() LoginDto: LoginDto,@Res({passthrough:true}) response:Response)
    : Promise<IResponse<{ access_token: string, refresh_token: string }>> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) throw new NotFoundException(`L'adresse EMail ou le mot de passe ne correspond pas.`);

    if (!await this.authService.compare(LoginDto.password, user.password)) throw new NotFoundException(`L'adresse EMail ou le mot de passe ne correspond pas.`);
    const { access_token, refresh_token } = await this.authService.createToken(user.id, user.role)
    if (!refresh_token) throw new UnauthorizedException();
    await this.authService.instertIntoCookies(refresh_token, "refresh_token", response ,{ maxAge: parseInt(process.env.refresh_cookie_maxage! ) } )

    return {
      data: { access_token, refresh_token },
      timeStamp: new Date(),
      url: "auth/login"
    }

  }
  // Hashtag Camomille & Cannelle les best <3
  @UseGuards(AuthGuard)
  @Get('refresh_token')
  async refresh_token(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    // const [type, token] = request.headers.cookie?.split('=') ?? []; Code sans cookie parser
    //Code avec Cookie npmParser
    const token = request.cookies['refresh_token'];
    let payload
    try {
      payload = await this.authService.verifyToken(token);
    } catch {
      throw new UnauthorizedException();
    }
    const { access_token, refresh_token } = await this.authService.createToken(payload.sub, payload.role)
    await this.authService.instertIntoCookies(refresh_token, "refresh_token", response)
    // await this.authService.instertIntoCookies(access_token, "access_token", response)
 
  }

  //Auth/logout 
  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(204)
  async clearCookies (@Res({passthrough: true}) response:Response) {
      response.clearCookie('refresh_token');
  }
}







