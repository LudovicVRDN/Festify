import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { FestivalService } from 'src/festival/festival.service';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'node:http2';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService,
    private festivalService: FestivalService
  ) { }

  async create(createMissionDto: CreateMissionDto, festivalId: number) {
    const festival = await this.prisma.festival.findUnique({
      where: { id: festivalId },
    });

    if (!festival) {
      throw new NotFoundException("Festival introuvable");
    }

    const missionStart = new Date(createMissionDto.time_start);
    const missionEnd = new Date(createMissionDto.time_end);

    if (missionStart < festival.start_date || missionEnd > festival.end_date) {
      throw new BadRequestException(
        "Les dates de la mission doivent être comprises dans les dates du festival"
      );
    }
    return this.prisma.mission.create({
      data: {
        ...createMissionDto,
        festival: {
          connect: { id: festivalId }
        }
      }
    })
  }

async createLinkVolunteerMission(userId: number, missionId: number) {

  try {
    const [inscription] = await this.prisma.$transaction([
      this.prisma.inscription.create({
        data: {
          user: { connect: { id: userId } },
          mission: { connect: { id: missionId } },
        },
      }),
      this.prisma.mission.update({
        where: { id: missionId },
        data: { volunteer_needed: { decrement: 1 } },
      }),
    ]);

    return inscription;
  } catch (error:any) {
    if (error.code === 'P2002') {
      throw new ConflictException('Vous êtes déjà inscrit à cette mission');
    }
    throw error;
  }
}

  async isFestivalIsValid(festivalid: number, id: number): Promise<boolean> {
    const existingFestival = await this.festivalService.countFestivalById(festivalid);
    const isOwner = await this.festivalService.checkFestivalOwnership(festivalid, id);
    return !!existingFestival && isOwner;
  }

async findAll() {
  return this.prisma.mission.findMany({
    include: {
      festival: {
        include: {
          adress: true,
        },
      },
      inscription: {
        select: { user_id: true },
      },
    },
  });
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

 async findAllMissionsByFestivalID(festivalId: number) {
  const missions = await this.prisma.mission.findMany({
    where: {
      festival_id: festivalId,
    },
    include: {
      festival: {
        include: {
          adress: true,
        },
      },
      inscription: {
        select: { user_id: true },
      },
    },
  });
  return missions;
}

async findAllMissionForVolunteer(userId: number) {
  const inscriptions = await this.prisma.inscription.findMany({
    where: { user_id: userId },
    include: {
      mission: {
        include: {
          festival: {
            include: { adress: true },
          },
          // 1. On inclut les inscriptions de la mission dans l'objet retourné
          inscription: true, 
        },
      },
    },
  });

  return inscriptions.map((i) => i.mission);
}
  async findOneById(id: number) {
    return this.prisma.mission.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number,festivalId:number, updateMissionDto: UpdateMissionDto) {

     const { id: _id, created_at, updated_at, festival_id, festival, ...safeData } = updateMissionDto as any;
    return this.prisma.mission.update({

      where: {
        id: id
      },
      data: {
        ...safeData,
        festival: {
          connect: { id: festivalId }
        }
      }
    })
  }

async remove(missionId: number, userId: number) {
  const mission = await this.prisma.mission.findFirst({
    where: {
      id: missionId,
      festival: {
        user_has_festival: {
          some: { user_id: userId },
        },
      },
    },
  });

  if (!mission) {
    throw new NotFoundException("Mission introuvable ou tu n'y as pas accès");
  }

  return this.prisma.mission.delete({ where: { id: missionId } });
}
}
