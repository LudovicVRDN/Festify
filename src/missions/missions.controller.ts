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
  ) { }

  @UseGuards(AuthGuard)
  @Post(':festivalid')
  async create(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any,
    @Body() createMissionDto: CreateMissionDto
  ) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    const mission = await this.missionsService.create(createMissionDto, festivalid);
    return mission;
  }
  
  @UseGuards(AuthGuard)
  @Get(":festivalid")
  async findAll(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any
  ) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.findAllMissionsByFestivalID(festivalid);
  }

  @UseGuards(AuthGuard)
  @Get(':festivalid/missions/:id')
  async findOne(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':festivalid/missions/:id')
  async update
    (@Param('festivalid', ParseIntPipe) festivalid: number,
      @Req() req: any,
      @Param('id', ParseIntPipe) id: number,
      @Body() updateMissionDto: UpdateMissionDto) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.update(id, updateMissionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':festivalid/missions/:id')
  async remove(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.remove(id);
  }
}
