import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { AdressService } from 'src/adress/adress.service';

@Module({
  controllers: [userController],
  providers: [UserService, AdressService],
  exports: [UserService]
})
export class UserModule {}
