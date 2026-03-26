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
      algorithm: 'HS512',
      expiresIn: "5m"
    }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
