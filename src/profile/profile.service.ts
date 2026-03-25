import { ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService, private userService: UserService) { }


  async create(createProfileDto: CreateProfileDto, userId: number) {
    //Check if user already got profile_id
    const user = await this.userService.findOne(userId);
    if (user?.profile_id) throw new ConflictException(`L'utilisateur ${userId} possède déja un profil`)

      const update = await this.prisma.$transaction(async (tx) => {
        const profile = await tx.profile.create({
          data: {
            ...createProfileDto,
          }
        })
        const updatedUser = await tx.user.update({
          where: { id: userId },
          data: { profile_id: profile.id }
        })
       
        return profile
      })
      return update
  }

  async findAll() {
    const profiles = await this.prisma.profile.findMany();
    return profiles
  }

  async findOne(id: number) {
    const user = await this.prisma.profile.findUnique({ where: { id } });
    if(!user) throw new NotFoundException(`Aucun utilisateur ${id} n'existe`);
    return user
  }

  async update(userId:number,id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.userService.findOne(userId);
    if(!user)throw new NotFoundException(`Aucun utilisateur ${userId} n'existe`);
    if(user?.profile_id === id){
    try {
      const newUser = await this.prisma.profile.update({
        where: { id },
        data: updateProfileDto,
      })
      return newUser
    } catch {
      throw new NotFoundException(`Profil ${id} introuvable`);
    }
    }else{
      throw new ForbiddenException("Vous n'avez pas accès à ce profil")
    }
  }

  async remove(userId:number,id: number) {
    const user = await this.userService.findOne(userId);
    if(!user)throw new NotFoundException(`Aucun utilisateur ${userId} n'existe`);
    if(user?.profile_id === id){
    await this.prisma.profile.delete({ where: { id } })
    return { message: `Profile #${id} deleted successfully` };
    }else{
      throw new ForbiddenException("Vous n'avez pas accès à ce profil")
    }
  }
}
