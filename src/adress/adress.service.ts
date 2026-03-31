import { Injectable } from '@nestjs/common';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AdressService {

  create(createAdressDto: CreateAdressDto) {
    return 'This action adds a new adress';
  }

  findAll() {
    return `This action returns all adress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adress`;
  }

  update(id: number, updateAdressDto: UpdateAdressDto) {
    return `This action updates a #${id} adress`;
  }

  remove(id: number) {
    return `This action removes a #${id} adress`;
  }
}
