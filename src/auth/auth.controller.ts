import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/registe.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) { }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  async register(
    @Body() createUserDto:CreateUserDto): Promise<{ access_token: string }> {
    const countUser = await this.userService.countByEmail(createUserDto.email);
    if (countUser) throw new ConflictException('Cette adresse EMail est déja utilisée');
    const user = await this.userService.create(createUserDto);
    const payload = { 
      sub: user.id, 
      userEmail: user.email 
    }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() LoginDto: LoginDto)
    : Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) throw new NotFoundException(`L'adresse EMail n'est pas trouvée.`)
      try{
    await this.authService.compare(user.password,LoginDto.password)
        const payload = { sub: user.id, userEmail: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload)
      }
    }catch{
      throw new UnauthorizedException();
    }
  }
}





