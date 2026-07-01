import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpStatus, HttpException, UseGuards, Req, ConflictException, Res } from '@nestjs/common';
import { IFestivalResponse, ISkillResponse, UserService, UserWithSkills } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NewPassword, UpdatePassword, UpdateUserDto } from './dto/update-user.dto';
import { festival, user } from 'prisma/generated/prisma/client';
import { captureRejectionSymbol } from 'events';
import { NotFoundError } from 'rxjs';
import { PickType } from '@nestjs/mapped-types';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import type { Request, response, Response } from 'express';
import { get } from 'http';

interface iDate {
  date: Date
}
@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<user[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id/festival')
  async findFestivals(@Req() req: any): Promise<IFestivalResponse[] | null> {
    const userFestival = await this.userService.findUsersFestivals(req.user.sub);
    return userFestival
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<user | null> {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new NotFoundException(`Utilisateurs  introuvable`)
    console.log(user)
    return user
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<user | null> {
    const user = await this.userService.findOne(id)
    if (!user) throw new NotFoundException(`Utilisateurs ${id} introuvable`)
    console.log(user)
    return user
  }

  @UseGuards(AuthGuard)
  @Get(':id/skills')
  async findSkills(@Req() req: any): Promise<ISkillResponse[] | null> {
     const user = await this.userService.findOne(req.user.sub)
    if (!user) throw new NotFoundException(`Utilisateurs ${req.user.sub} introuvable`)
    const userSkills: ISkillResponse[] = await this.userService.findUsersSkills(req.user.sub)
    return userSkills
  }

  @UseGuards(AuthGuard)
  @Get(':id/skills/details')
  async findUniqueSkill(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<ISkillResponse | null> {

    const userSkill: ISkillResponse = await this.userService.findOneUsersSkills(req.user.sub, id)
    return userSkill
  }


  @UseGuards(AuthGuard)
  @Get(':id/festival/details')
  async findUniqueFestivals(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<IFestivalResponse | null> {
    const userUniqueFestival = await this.userService.findUsersOneFestivals(req.user.sub, id);
    return userUniqueFestival
  }


  @UseGuards(AuthGuard)
  @Patch(':id/update/password')
  async updatePassword(@Param('id', ParseIntPipe) id: number,
    @Body() updatePassword: UpdatePassword): Promise<void> {
    await this.userService.updatePassword(id, updatePassword);
    return console.log("Mot de passe modifié avec succès")
  }

  @UseGuards(AuthGuard)
  @Patch(":id/update")
  async update(@Body() updateuserDto: UpdateUserDto, @Req() req): Promise<iDate> {
    if (updateuserDto.email) {
      const existingUser = await this.userService.findByEmail(updateuserDto.email);

      if (existingUser && existingUser.id !== req.user.sub) {
        throw new ConflictException('Cette adresse EMail est déjà utilisée !');
      }
    }

    await this.userService.update(req.user, updateuserDto);
    return { date: new Date() }
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('refresh_token');
    return this.userService.remove(+id);
  }

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body()
    newPassword: NewPassword) {
    return this.userService.resetPassword(token, newPassword);
  }
}
