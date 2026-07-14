import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ConflictException } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { festival } from 'prisma/generated/prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AdressService } from 'src/adress/adress.service';
import { RolesGuard } from 'src/middleware/roleGuard/role.guard';
import { Roles } from 'src/middleware/roleGuard/role.decorator';

@Controller('festival')
export class FestivalController {
  constructor(
    private readonly festivalService: FestivalService,
    private adressService: AdressService,


  ) { }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
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
      }
      const myFestival = await this.festivalService.create(createFestivalDto, existingAdress);
      await this.festivalService.createLinkUserAndFestival(myFestival.id, req.user.sub)
    
    return myFestival
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  
  @Get()
  async findAll(){
    return this.festivalService.findAll()
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto): Promise<festival | undefined> {

    const existingFestival = await this.festivalService.countFestivalOrThrow(updateFestivalDto,+id)

    if (existingFestival) {
      throw new ConflictException('Ce festival est déja programmé')
    }
    const adress = updateFestivalDto.adress
    
      const existingAdress = adress ? await this.adressService. findExistingAdress(adress) :null

      if (existingAdress) {

        const isAdressNotFree = await this.festivalService.checkDisponibility(updateFestivalDto, existingAdress.id,+id)

        if (isAdressNotFree) {
          throw new ConflictException('Cette adress et cette date ne sont pas disponible ')
        }
      }
  
    return this.festivalService.update(+id, updateFestivalDto,existingAdress);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.festivalService.remove(+id, req.user.sub);
  }
}
