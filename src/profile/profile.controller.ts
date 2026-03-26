import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {
  prisma: any;
  constructor(private readonly profileService: ProfileService, private userService: UserService) { }

  // @UseGuards(AuthGuard)
  // @Post()
  // async create(@Body() createProfileDto: CreateProfileDto, @Request() req) {
  //   const user = await this.userService.findOne(req.user.sub);
  //   if (user?.profile_id) throw new ConflictException(`L'utilisateur ${req.user.sub} possède déja un profil`)
  //   return await this.profileService.createAndUpdateProfile(createProfileDto,req.user.sub)
  // }

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
        where: { id : req.user},
        data: updateProfileDto,
      })
      return newUser
    }
    catch {
      throw new ForbiddenException("Vous n'avez pas accès à ce profil")
    }

  }
}
