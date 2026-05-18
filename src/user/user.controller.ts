import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpStatus, HttpException, UseGuards, Req, ConflictException, Res } from '@nestjs/common';
import { ISkillResponse, UserService, UserWithSkills } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from 'prisma/generated/prisma/client';
import { captureRejectionSymbol } from 'events';
import { NotFoundError } from 'rxjs';
import { PickType } from '@nestjs/mapped-types';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import type { Request, response, Response } from 'express';

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

    const userSkills: ISkillResponse[] = await this.userService.findUsersSkills(req.user)
    return userSkills
  }

  @UseGuards(AuthGuard)
  @Get(':id/skills/details')
  async findUniqueSkill(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<ISkillResponse | null> {

    const userSkill: ISkillResponse = await this.userService.findOneUsersSkills(req.user, id)
    return userSkill
  }

  @UseGuards(AuthGuard)
  @Patch(":id/update")
  async update(@Body() updateuserDto: UpdateUserDto, @Req() req): Promise<iDate> {
    if (updateuserDto.email) {
      const existingUser = await this.userService.findByEmail(updateuserDto.email);

      if (existingUser && existingUser.id !== req.user) {
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

  @Patch('/reset-password')
  async resetPassword(@Body() { token, newPassword }: { token: string, newPassword: string }) {
      return this.userService.resetPassword(token, newPassword);
  }
}
