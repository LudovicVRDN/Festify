import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { userController } from './user.controller';

@Module({
  controllers: [userController],
  providers: [userService],
  exports: [userService]
})
export class UserModule {}
