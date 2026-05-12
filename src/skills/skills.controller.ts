import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() req: any,
    @Body() createSkillDto: CreateSkillDto) {
    const userId = req.user;
    console.log(userId)
    const skill = await this.skillsService.create(createSkillDto);
    if (skill) await this.skillsService.createLinkUserAndSkills(skill.id, userId)
  }

  @UseGuards(AuthGuard)
  @Patch(':id/update')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return await this.skillsService.update(+id, updateSkillDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    const userId = req.user;
  
    
    return await this.skillsService.remove(id,userId);
  }
}
