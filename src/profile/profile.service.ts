import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) { }


  async create(createProfileDto: CreateProfileDto, userId: number) {
    const profile = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
      }
    })
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { profile_id: profile.id }
    })
    console.log('profile créé :', profile)
    console.log('user mis à jour :', updatedUser)
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
