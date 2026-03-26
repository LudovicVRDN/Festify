import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from 'prisma/generated/prisma/client';
import { captureRejectionSymbol } from 'events';
import { NotFoundError } from 'rxjs';
import { PickType } from '@nestjs/mapped-types';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import type { Request } from 'express';

interface iDate {
  date: Date
}
@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // async create(@Body() createuserDto: CreateUserDto): Promise<user> {
  //   const countEmail = await this.userService.countByEmail(createuserDto.email)
  //   if (countEmail) {
  //     throw new HttpException('Email already used', HttpStatus.PRECONDITION_FAILED)
  //   }
  //   return this.userService.create(createuserDto);
  // }

  @Get()
  async findAll(): Promise<user[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<user | null> {
    const user = await this.userService.findOne(id)
    if (!user) throw new NotFoundException(`Utilisateurs ${id} introuvable`)
    console.log(user)
    return user
  }
  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() updateuserDto: UpdateUserDto, @Req() req): Promise<iDate> {

    await this.userService.update(req.user, updateuserDto);
    return { date: new Date() }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return this.userService.remove(+id);
    } catch {
      throw new NotFoundException(`Utilisateurs ${id} introuvable`)
    }
  }
}
