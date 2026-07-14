import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { get } from 'node:http';
import { RolesGuard } from 'src/middleware/roleGuard/role.guard';
import { Roles } from 'src/middleware/roleGuard/role.decorator';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['benevole'])
  @Post()
  async create(
    @Req() req: any,
    @Body() createSkillDto: CreateSkillDto) {
    const userId = req.user.sub;
    console.log(userId)
    const skill = await this.skillsService.create(createSkillDto);
    if (skill) await this.skillsService.createLinkUserAndSkills(skill.id, userId)
  }

 @UseGuards(AuthGuard, RolesGuard)
  @Roles(['benevole'])
  @Patch(':id/update')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    
    return await this.skillsService.update(+id, updateSkillDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['benevole'])
  @Delete(':id/delete')
  async remove(
    @Param('id') id: number,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return await this.skillsService.remove(id, userId);
  }
}
