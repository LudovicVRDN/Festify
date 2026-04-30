import { Injectable } from '@nestjs/common';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AdressService {
  constructor(private prisma :PrismaService){}

  create(createAdressDto: CreateAdressDto) {
    return 'This action adds a new adress';
  }

  findAll() {
    return `This action returns all adress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adress`;
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
