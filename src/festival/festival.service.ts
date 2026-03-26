import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';

@Injectable()
export class FestivalService {
  create(createFestivalDto: CreateFestivalDto) {
    return 'This action adds a new festival';
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
