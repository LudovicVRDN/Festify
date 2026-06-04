import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req, UnauthorizedException, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { FestivalService } from 'src/festival/festival.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('missions')
export class MissionsController {
  constructor(
    private readonly missionsService: MissionsService,
    private festivalService: FestivalService
  ) {}

  @UseGuards(AuthGuard)
  @Post(':festivalid')
  async create(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req:any,
    @Body() createMissionDto: CreateMissionDto
    ) {
    if(!this.festivalService.countFestivalById(festivalid)){
      throw new NotFoundException('Aucun festival trouvé avec cet id');
    }
    if(!this.festivalService.checkFestivalOwnership(festivalid, req.user)){
      throw new UnauthorizedException("Tu n'es pas le propriétaire de ce festival");
    }
    const mission = await this.missionsService.create(createMissionDto,festivalid);
    return mission;
  }

  @Get(":festivalid")
  findAll(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req:any
  ) {
    if(!this.festivalService.countFestivalById(festivalid)){
      throw new NotFoundException('Aucun festival trouvé avec cet id');
    }
    if(!this.festivalService.checkFestivalOwnership(festivalid, req.user)){
      throw new UnauthorizedException("Tu n'es pas le propriétaire de ce festival");
    }
    return this.missionsService.findAllMissionsByFestivalID(festivalid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if()
    return this.missionsService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionDto: UpdateMissionDto) {
    return this.missionsService.update(+id, updateMissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionsService.remove(+id);
  }
}
