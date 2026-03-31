import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/registe.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/log-in.dto';
import { IResponse } from 'src/utils/IResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) { }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto): Promise< string > {
    const countUser = await this.userService.countByEmail(createUserDto.email);
    if (countUser) throw new ConflictException('Cette adresse EMail est déja utilisée');
    const user = await this.userService.create(createUserDto);
    const payload = {
      sub: user.id,
      userEmail: user.email
    }
    return "Ton compte est crée ! "
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() LoginDto: LoginDto)
    : Promise<IResponse<{access_token: string , refresh_token :string}>> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) throw new NotFoundException(`L'adresse EMail ou le mot de passe ne correspond pas.`);

    if (!await this.authService.compare(LoginDto.password,user.password)) throw new NotFoundException(`L'adresse EMail ou le mot de passe ne correspond pas.`);
    const { access_token, refresh_token } = await this.authService.createToken(user.id)
    
    return {
      data: { access_token, refresh_token },
      timeStamp: new Date(),
      url: "auth/login"
    }

  }
}





