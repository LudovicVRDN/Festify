import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {
  prisma: any;
  constructor(private readonly profileService: ProfileService, private userService: UserService) { }


  @Get()
  findAll() {
    try {
      return this.profileService.findAll();
    } catch {
      throw new NotFoundException(`Profil introuvable`)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.profileService.findOne(+id);
    } catch {
      throw new NotFoundException(`Profil introuvable`)
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Body() updateProfileDto: UpdateProfileDto, @Request() req) {

    try {
      const newUser = await this.prisma.profile.update({
        where: { id : req.user.sub},
        data: updateProfileDto,
      })
      return newUser
    }
    catch {
      throw new ForbiddenException("Vous n'avez pas accès à ce profil")
    }

  }
}
