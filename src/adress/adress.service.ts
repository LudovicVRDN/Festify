import { Injectable } from '@nestjs/common';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Adress } from './entities/adress.entity';
import { adress } from 'prisma/generated/prisma/client';

@Injectable()
export class AdressService {
  constructor(private prisma :PrismaService){}

  create(createAdressDto: CreateAdressDto) {
    return 'This action adds a new adress';
  }

  async findExistingAdress(adress:CreateAdressDto):Promise<adress | null>{
    const existingAdress = this.prisma.adress.findFirst({
      where:{
        city:adress.city,
        street:adress.street,
        postalCode:adress.postalCode
      }
    })
  
    if(existingAdress){
      return existingAdress
    }else{
      return null
    }
  }

 async findOne(id: number) {
    return await this.prisma.adress.findUnique({ where: { id } });
  }

  async updatePrisma(userid: number, updateAdressDto: UpdateAdressDto) {
    return await this.prisma.adress.update({
      where:{ id : userid},
      data : updateAdressDto,
    })
  }

  async removePrisma(userId: number) {
    // return `This action removes a #${id} adress`;
  }
}
