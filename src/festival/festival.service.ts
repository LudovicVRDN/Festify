import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { AdressService } from 'src/adress/adress.service';

@Injectable()
export class FestivalService {
  constructor(
    private prisma: PrismaService,
    private adressService: AdressService

  ) { }

  async create(createFestivalDto: CreateFestivalDto) {
    const { adress, ...rest } = createFestivalDto
    const existingFestival = await this.findFirstFestival(createFestivalDto)
    if (existingFestival) {
      throw new ConflictException('Ce festival existe déja !')
    }
    const existingAdress = await this.adressService.findExistingAdress(createFestivalDto.adress)
    if (existingAdress) {
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

  async findFirstFestival(festival: CreateFestivalDto): Promise<boolean> {
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
      return true
    } else {
      return false
    }
  }

  findAll() {
    return `This action returns all festival`;
  }

  findOne(id: number) {
    return `This action returns a #${id} festival`;
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return `This action updates a #${id} festival`;
  }

  remove(id: number) {
    return `This action removes a #${id} festival`;
  }
}
