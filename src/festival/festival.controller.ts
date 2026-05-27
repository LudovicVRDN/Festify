import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { festival } from 'prisma/generated/prisma/client';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Post()
  async create(@Body() createFestivalDto: CreateFestivalDto) {
    return await this.festivalService.create(createFestivalDto);
  }

  @Get()
  findAll() {
    return this.festivalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto) :Promise<festival | undefined> {
    return this.festivalService.update(+id, updateFestivalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.festivalService.remove(+id);
  }
}
