import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalController } from './festival.controller';
import { AdressService } from 'src/adress/adress.service';

@Module({
  controllers: [FestivalController],
  providers: [FestivalService,AdressService],
})
export class FestivalModule {}
