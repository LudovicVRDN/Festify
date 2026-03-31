import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: process.env.access_secret,
    signOptions: {
      algorithm: process.env.JWTAlgorithm as any,
      expiresIn: process.env.acces_expire as any
    }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
