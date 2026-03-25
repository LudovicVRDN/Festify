import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, HttpStatus, HttpException } from '@nestjs/common';
import { userService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from 'prisma/generated/prisma/client';
import { captureRejectionSymbol } from 'events';
import { NotFoundError } from 'rxjs';
import { PickType } from '@nestjs/mapped-types';

interface iDate {
  date: Date
}
@Controller('user')
export class userController {
  constructor(private readonly userService: userService) { }

  @Post()
  async create(@Body() createuserDto: CreateUserDto): Promise<user> {
    const countEmail = await this.userService.countByEmail(createuserDto.email)
    if (countEmail) {
      throw new HttpException('Email already used', HttpStatus.PRECONDITION_FAILED)
    }
    return this.userService.create(createuserDto);
  }

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

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateuserDto: UpdateUserDto): Promise<iDate> {
    const userCount = await this.userService.countByID(id)
    if (!userCount) throw new NotFoundException(`Utilisateurs ${id} introuvable`)
    if (updateuserDto.email) {
      const userEmail = await this.userService.findEmailById(id);
      if (userEmail && userEmail.email !== updateuserDto.email) {
        const countEmail = await this.userService.countByEmail(updateuserDto.email)
        if (countEmail)
          throw new HttpException('Email already used', HttpStatus.PRECONDITION_FAILED)
      }
    }

    await this.userService.update(id, updateuserDto);
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
