import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req, UnauthorizedException, UseGuards, ParseIntPipe, ConflictException } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { FestivalService } from 'src/festival/festival.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/middleware/roleGuard/role.guard';
import { Roles } from 'src/middleware/roleGuard/role.decorator';

@Controller('missions')
export class MissionsController {
  constructor(
    private readonly missionsService: MissionsService,
    private festivalService: FestivalService
  ) { }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Post(':festivalid')
  async create(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any,
    @Body() createMissionDto: CreateMissionDto
  ) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req.user.sub)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    const mission = await this.missionsService.create(createMissionDto, festivalid);
    return mission;
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['benevole'])
  @Post(':missionid/inscription')
  async linkVolunteerMission(
    @Param('missionid', ParseIntPipe) missionid: number,
    @Req() req: any,
  ){
     const mission = await this.missionsService.findOneById(missionid);
  if (!mission) {
    throw new NotFoundException('Mission introuvable');
  }
  if (mission.volunteer_needed <= 0) {
    throw new ConflictException('Mission complète');
  }
    return this.missionsService.createLinkVolunteerMission(req.user.sub,missionid)
  }
  
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Get("")
  async findAllByUserID(
    @Req() req: any
  ) {
    return this.missionsService.findAllMissionsByUserID(req.user.sub);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['benevole'])
  @Get('mine')
  async findAllVolunteersMissions(
    @Req() req:any
  ){
    const missions= await  this.missionsService.findAllMissionForVolunteer(req.user.sub)
    if(!missions) throw new NotFoundException("Pas de missions trouvées")

      return missions
  }


  @UseGuards(AuthGuard)
  @Get('/all')
  async findAll(){
    return this.missionsService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(":festivalid")
  async findAllByFestivalID(
     @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any
  ) {
    return this.missionsService.findAllMissionsByFestivalID(festivalid);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Get(':festivalid/missions/:id')
  async findOne(
    @Param('festivalid', ParseIntPipe) festivalid: number,
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req.user.sub)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.findOneById(id);
  }

    @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Patch(':festivalid/mission/:id')
  async update
    (@Param('festivalid', ParseIntPipe) festivalid: number,
      @Req() req: any,
      @Param('id', ParseIntPipe) id: number,
      @Body() updateMissionDto: UpdateMissionDto) {
    if (!await this.missionsService.isFestivalIsValid(festivalid, req.user.sub)) {
      throw new NotFoundException('Tu n\'as pas accès à ce festival ou il n\'existe pas');
    }
    return this.missionsService.update(id, festivalid, updateMissionDto);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(['organisateur'])
  @Delete(':id')
  async remove(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number) {
 
    return this.missionsService.remove(id,req.user.sub);
  }
}
