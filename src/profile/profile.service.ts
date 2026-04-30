import { ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService, private userService: UserService) { }


  // async createAndUpdateProfile( userId: number) {
  //   //Check if user already got profile_id
  //   const update = await this.prisma.$transaction(async (tx) => {
  //     const profile = await tx.profile.create({
  //       data: {
  //         ...createProfileDto,
  //       }
  //     })
  //     const updatedUser = await tx.user.update({
  //       where: { id: userId },
  //       data: { profile_id: profile.id }
  //     })
  //     return profile
  //   })
  // }

  async findAll() {
     return await this.prisma.profile.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.profile.findUnique({ where: { id } });
  }

  // async update(userId:number,id: number, updateProfileDto: UpdateProfileDto) {
  //   const user = await this.userService.findOne(userId);
  //   if(!user)throw new NotFoundException(`Aucun utilisateur ${userId} n'existe`);
  //   if(user?.profile_id === id){
  //   try {
  //     const newUser = await this.prisma.profile.update({
  //       where: { id },
  //       data: updateProfileDto,
  //     })
  //     return newUser
  //   } catch {
  //     throw new NotFoundException(`Profil ${id} introuvable`);
  //   }
  //   }else{
  //     throw new ForbiddenException("Vous n'avez pas accès à ce profil")
  //   }
  // }

  // async remove(userId:number,id: number) {
  //   const user = await this.userService.findOne(userId);
  //   if(!user)throw new NotFoundException(`Aucun utilisateur ${userId} n'existe`);
  //   if(user?.profile_id === id){
  //   await this.prisma.profile.delete({ where: { id } })
  //   return { message: `Profile #${id} deleted successfully` };
  //   }else{
  //     throw new ForbiddenException("Vous n'avez pas accès à ce profil")
  //   }
  // }
}
