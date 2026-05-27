import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ConflictException } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { festival } from 'prisma/generated/prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AdressService } from 'src/adress/adress.service';

@Controller('festival')
export class FestivalController {
  constructor(
    private readonly festivalService: FestivalService,
    private adressService: AdressService,


  ) { }

  @UseGuards(AuthGuard)
  @Post()
  async create
    (@Body() createFestivalDto: CreateFestivalDto,
      @Req() req: any
    ) {
    const existingAdress = await this.adressService.findExistingAdress(createFestivalDto.adress);
    if (existingAdress) {
      const isAdressNotFree = await this.festivalService.checkDisponibility(createFestivalDto, existingAdress?.id)
      if (isAdressNotFree) {
        throw new ConflictException('Cette adresse et cette date ne sont pas disponible ')
      }
      const myFestival = await this.festivalService.create(createFestivalDto, existingAdress);
      await this.festivalService.createLinkUserAndFestival(myFestival.id, req.user)
      return 'ca a marché tout est crée et lié !!'
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto): Promise<festival | undefined> {

    const existingFestival = await this.festivalService.countFestivalOrThrow(updateFestivalDto)

    if (existingFestival) {
      throw new ConflictException('Ce festival est déja programmé')
    }

    const adress = updateFestivalDto.adress
    
      const existingAdress = adress ? await this.adressService. findExistingAdress(adress) :null

      if (existingAdress) {

        const isAdressNotFree = await this.festivalService.checkDisponibility(updateFestivalDto, existingAdress?.id)

        if (isAdressNotFree) {
          throw new ConflictException('Cette adress et cette date ne sont pas disponible ')
        }
      }
  
    return this.festivalService.update(+id, updateFestivalDto,existingAdress);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.festivalService.remove(+id, req.user);
  }
}
