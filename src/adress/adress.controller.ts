import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ForbiddenException } from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post()
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressService.create(createAdressDto);
  }

  @Get()
  findAll() {
    return this.adressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateAdressDto: UpdateAdressDto,@Req() req) {
    try{
   const newUser = this.adressService.updatePrisma(req.sub,updateAdressDto)
   }catch{
    throw new ForbiddenException("Vous n'avez pas accès à ce profil")
   }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.adressService.remove(+id);
  }
}
