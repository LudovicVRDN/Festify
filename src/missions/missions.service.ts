import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { FestivalService } from 'src/festival/festival.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService,
    private festivalService: FestivalService
  ) { }

  create(createMissionDto: CreateMissionDto, festivalId: number) {
    return this.prisma.mission.create({
      data: {
        ...createMissionDto,
        festival: {
          connect: { id: festivalId }
        }
      }
    })
  }

  async isFestivalIsValid(festivalid: number, id: number): Promise<boolean> {
    const existingFestival = await this.festivalService.countFestivalById(festivalid);
    const isOwner = await this.festivalService.checkFestivalOwnership(festivalid, id);
    return !!existingFestival && isOwner;
  }

  async findAllMissionsByUserID(userId: number) {
    const missions = await this.prisma.mission.findMany({
      where: {
        festival: {
          user_has_festival: {
            some: {
              user_id: userId,
            },
          },
        },
      },
      include: {
        festival: {
          include: {
            adress: true,
          },
        },
      },
    });

    return missions
  }

  async findOneById(id: number) {
    return this.prisma.mission.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateMissionDto: UpdateMissionDto) {
    return this.prisma.mission.update({
      where: {
        id: id
      },
      data: updateMissionDto
    })
  }

  async remove(id: number) {
    return this.prisma.mission.delete({
      where: {
        id: id
      }
    })
  }
}
