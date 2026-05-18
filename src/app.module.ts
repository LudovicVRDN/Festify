import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { FestivalModule } from './festival/festival.module';
import { AdressModule } from './adress/adress.module';
import { SkillsModule } from './skills/skills.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [UserModule,PrismaModule, AuthModule, ProfileModule,ConfigModule.forRoot({isGlobal:true}), FestivalModule, AdressModule, SkillsModule, MailingModule],
  providers: [ProfileService],
})
export class AppModule {}
