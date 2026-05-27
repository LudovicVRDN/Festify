import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { AdressService } from 'src/adress/adress.service';
import { festival } from 'prisma/generated/prisma/client';
import { cpSync } from 'fs';

@Injectable()
export class FestivalService {
  constructor(
    private prisma: PrismaService,
    private adressService: AdressService

  ) { }

  async create(createFestivalDto: CreateFestivalDto) {
    const { adress, ...rest } = createFestivalDto
    const existingFestival = await this.findFirstFestival(createFestivalDto)
    const existingAdress = await this.adressService.findExistingAdress(createFestivalDto.adress)
    if (existingFestival) {
      throw new ConflictException('Ce festival existe déja !')
    }
    if (existingAdress) {
      const isAdressNotFree = await this.checkDisponibility(createFestivalDto, existingAdress?.id)
      if (isAdressNotFree) {
        throw new ConflictException('Cette adress et cette date ne sont pas disponible ')
      }
      const festival = await this.prisma.festival.create({
        data: {
          ...rest,
          adress: {
            connect: {
              id: existingAdress.id
            }
          }
        }
      })
      return festival
    } else {
      const festival = await this.prisma.festival.create({
        data: {
          ...rest,
          adress: {
            create: {
              street: adress.street,
              city: adress.city,
              postalCode: adress.postalCode
            }
          }

        }
      })
      return festival
    }
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
    if (unavaliableAdress) {
      return true
    } else {
      return false
    }
  }

  async findFirstFestival(festival: CreateFestivalDto | UpdateFestivalDto): Promise<festival | null> {

    if (!festival.name || !festival.adress) {
      return null;
    }
    const festivalExiste = await this.prisma.festival.findFirst({
      where: {
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
    if (festivalExiste) {
      return festivalExiste
    } else {
      return null
    }
  }

  async update(id: number, updateFestivalDto: UpdateFestivalDto):Promise<festival | undefined> {
    const { adress, ...rest } = updateFestivalDto
    const { id: _id, created_at, updated_at, role, is_validated, ...safeRest } = rest as any
  
    const existingFestival = await this.findFirstFestival(updateFestivalDto)
    if (existingFestival) {
      throw new ConflictException('Ce festival est déja programmé')
    }
    if(!adress){
      const thisFestival = await this.findOne(id);
      // if(!thisFestival)throw new NotFoundException('Pas de festival correspondant')
      const isAdressNotFree = await this.checkDisponibility(updateFestivalDto,thisFestival.adress_id, thisFestival.id)
        if (isAdressNotFree) {
          throw new ConflictException('Cette adress et cette date ne sont pas disponible ')
        }
        const updatedFestival = await this.prisma.festival.update({
          where:{ id },
          data:{
            ...safeRest
          }
        })
        return updatedFestival
    }

    else{
      const existingAdress = await this.adressService.findExistingAdress(adress)
      if (existingAdress) {
        const isAdressNotFree = await this.checkDisponibility(updateFestivalDto, existingAdress?.id)
        if (isAdressNotFree) {
          throw new ConflictException('Cette adress et cette date ne sont pas disponible ')
        }
        const updatedFestival = await this.prisma.festival.update({
          where: { id },
          data: {
            ...safeRest,
            adress: {
              connect: { id: existingAdress.id }
            }
          }
        })
        return updatedFestival
      } else {
        if (!adress.street || !adress.city || !adress.postalCode) {
          throw new BadRequestException('Les champs de l\'adresse sont incomplets')
        }
        const updatedFestival = await this.prisma.festival.update({
          where: { id },
          data: {
            ...safeRest,
            adress: {
              create: {
                street: adress.street,
                city: adress.city,
                postalCode: adress.postalCode
              }
            }
          }
        })
         return updatedFestival
    }
    }
  }


  findAll() {
    return `This action returns all festival`;
  }

  async findOne(id: number) :Promise<festival> {
    const festival = await this.prisma.festival.findUnique({
      where:{id}
    })
    if(!festival) throw new NotFoundException('Pas de festival trouvé')
    return festival
  }


  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
