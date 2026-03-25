import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) { }


  async create(createProfileDto: CreateProfileDto, userId: number) {
    try{
    const profile = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
      }
    })
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { profile_id: profile.id }
    })
    console.log(updatedUser)
    return profile
    }catch (error) {
    if (error.code === 'P2002') { // P2002 = unique constraint violation
      throw new ConflictException(`L'utilisateur ${userId} a déjà un profil`);
    }
    throw error
  }
}

  async findAll() {
    const profiles = await this.prisma.profile.findMany();
    console.log(profiles);
    return profiles
  }

  async findOne(id: number) {
    return await this.prisma.profile.findUnique({where : {id}})
  }

  async countById(id:number){
    return await this.prisma.profile.count({
      where:{ id }
    })
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
  try{
   const newUser = await this.prisma.profile.update({
    where :{id},
    data: updateProfileDto,
   })
   return newUser
   }catch{
      throw new NotFoundException(`Profil ${id} introuvable`);
  }
}

  async remove(id: number) {
    await this.prisma.profile.delete({where : {id}})
    return { message: `Profile #${id} deleted successfully` };
  }
}
