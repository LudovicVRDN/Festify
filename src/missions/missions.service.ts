import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { FestivalService } from 'src/festival/festival.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService
  ){}

  create(createMissionDto: CreateMissionDto,festivalId:number) {
   return this.prisma.mission.create({
    data:{
      ...createMissionDto,
      festival:{
        connect:{id: festivalId}
      } 
    }
   })
  }

  async findAllMissionsByFestivalID(festivalId: number) {
      return this.prisma.mission.findMany({
        where: {
          festival_id: festivalId
        }
      })
  }

  async findOneById(id: number) {
    return this.prisma.mission.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateMissionDto: UpdateMissionDto) {
    return `This action updates a #${id} mission`;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}
