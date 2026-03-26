import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private createUserDTO:CreateUserDto) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() signInDTO: signInDTO) {
    return this.authService.logIn(signInDTO.email, signInDTO.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDTO: signInDTO) {
    return this.authService.signIn(signInDTO)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
