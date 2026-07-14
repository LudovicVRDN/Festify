import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { FestivalService } from 'src/festival/festival.service';
import { AdressService } from 'src/adress/adress.service';

@Module({
  controllers: [MissionsController],
  providers: [MissionsService,FestivalService,AdressService],
})
export class MissionsModule {}
