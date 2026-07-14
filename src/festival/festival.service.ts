import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { AdressService } from 'src/adress/adress.service';
import { adress, festival } from 'prisma/generated/prisma/client';
import { cpSync } from 'fs';
import { connect } from 'http2';

@Injectable()
export class FestivalService {
  constructor(
    private prisma: PrismaService,
    private adressService: AdressService

  ) { }

  async create(createFestivalDto: CreateFestivalDto, existingAdress: adress |null) {
    const { adress, ...rest } = createFestivalDto;
     const startDate = new Date(createFestivalDto.start_date);
  const endDate = new Date(createFestivalDto.end_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore l'heure pour comparer juste les jours

  if (startDate < today) {
    throw new BadRequestException("Le festival ne peut pas commencer dans le passé");
  }

  if (endDate < startDate) {
    throw new BadRequestException("La date de fin doit être après la date de début");
  }

    const festival = await this.prisma.festival.create({
      data: {
        ...rest,
        adress: {
          connectOrCreate: {
            create: {
              street: adress.street,
              city: adress.city,
              postalCode: adress.postalCode
            },
            where: { id: existingAdress?.id ?? 0 }
          }
        }
      }
    })
    return festival

  }


  async createLinkUserAndFestival(
    festivalID: number,
    userID: number
  ) {
    await this.prisma.user_has_festival.create({
      data: {
        user: {
          connect: { id: userID }
        },
        festival: {
          connect: { id: festivalID }
        }
      }
    })
  }

  async checkFestivalOwnership(festivalId: number, userId: number): Promise<boolean> {
    const link = await this.prisma.user_has_festival.findUnique({
      where: { user_id_festival_id: {
        festival_id: festivalId,
        user_id: userId
      }}
    })
    return !!link
  }

  async checkDisponibility(
    festival: CreateFestivalDto | UpdateFestivalDto,
    adressId: number | undefined,
    currentFestivalId?: number
  ): Promise<boolean> {
    const unavaliableAdress = await this.prisma.festival.findFirst({
      where: {
        start_date: {
          lte: festival.end_date,
        },
        end_date: {
          gte: festival.start_date,
        },
        adress_id: adressId,
        ...(currentFestivalId && {
          NOT: { id: currentFestivalId }
        })
      }
    })
    return !!unavaliableAdress
  }

  async countFestivalOrThrow(festival: CreateFestivalDto | UpdateFestivalDto,festivalId: number): Promise<number | null> {

    if (!festival.name || !festival.adress) {
      return null;
    }
    return await this.prisma.festival.count({
      where: {
        id: {
          not: festivalId
        },
        name: festival.name,
        start_date: festival.start_date,
        end_date: festival.end_date,
        adress: {
          city: festival.adress.city,
          street: festival.adress.street,
          postalCode: festival.adress.postalCode
        }
      }
    });

  }

 async findAll() {
  return this.prisma.festival.findMany({
    include: { adress: true } 
  });
}


  async update(id: number, updateFestivalDto: UpdateFestivalDto, existingAdress: adress | null): Promise<festival | undefined> {
    const { adress, ...rest } = updateFestivalDto
    const { id: _id, created_at, updated_at, role, is_validated, ...safeRest } = rest as any

    const updatedFestival = await this.prisma.festival.update({
      where: { id },
      data: {
        ...safeRest,
        ...(adress && {
          adress: {
            connectOrCreate: {
              where: {
                id: existingAdress?.id ?? 0
              },
              create: {
                street: adress.street,
                city: adress.city,
                postalCode: adress.postalCode
              }
            }
          }
        })

      }
    })
    return updatedFestival

  }

  async countFestivalById(id: number): Promise<number> {
    return await this.prisma.festival.count({
      where: { id }
    })
  }


  async findOne(id: number): Promise<festival> {
  const festival = await this.prisma.festival.findUnique({
    where: { id },
    include: { adress: true },
  });
  if (!festival) throw new NotFoundException('Pas de festival trouvé');
  return festival;
}


  async remove(id: number, userID: number) {
    await this.prisma.user_has_festival.delete({
      where: {
        user_id_festival_id: {
          festival_id: id,
          user_id: userID
        }
      }
    })
    await this.prisma.festival.delete({ where: { id } })
    return "Delete perfectly"
  }
}
