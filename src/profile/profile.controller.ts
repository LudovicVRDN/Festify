import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto, @Request() req) {
    return await this.profileService.create(createProfileDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.profileService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @Request() req) {
    return this.profileService.update(req.user.sub, +id, updateProfileDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.profileService.remove(req.user.sub, +id);
  }
}
