import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from 'prisma/generated/prisma/client';
import { skills, user } from 'prisma/generated/prisma/client';
import * as bcrypt from 'bcrypt';


export type UserWithSkills = Prisma.userGetPayload<{
  include: {
    skills_has_user: {
      include: { skills: true }
    }
  }
}>
export interface ISkillResponse {
  id: number;
  name: string;
  description: string;
}

@Injectable()


export class UserService {
  constructor(private prisma: PrismaService) { }
  

  async create(createuserDto: CreateUserDto): Promise<user> {
    const { password, profile, ...rest } = createuserDto
    const hashedPassword = await bcrypt.hash(createuserDto.password, 10)
    const user: user = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        profile: {
          create: {
            firstname: profile.firstname,
            lastname: profile.lastname,
            adress: {
              create: profile.adress
            }
          }
        }
      }
    })
    console.log(user)
    return user
  }

  async findAll(): Promise<user[]> {
    const users = await this.prisma.user.findMany()
    console.log(users)
    return users
  }

  async findUsersSkills(id:number) :Promise<ISkillResponse[]> {
    const usersSkills = await this.prisma.user.findMany({
      where : {id},
      include :{
        skills_has_user :{
          include : {
            skills : true
          }
        }
      }
    })
    return usersSkills[0].skills_has_user.map(s => ({
    id: s.skills.id,
    name: s.skills.name,
    description: s.skills.description,
  }));
  }

   async findOneUsersSkills(id:number,skillId:number) :Promise<ISkillResponse> {
    const usersSkill = await this.prisma.user.findUnique({
      where : {id},
      include :{
        skills_has_user :{
          where:{
            skills_id: skillId},
          include : {
            skills : true
          }
        }
      }
    })
    if(!usersSkill || usersSkill?.skills_has_user.length === 0){
      throw new NotFoundException('Compétence introuvable pour cet utilisateur');
    }
    const skill = usersSkill.skills_has_user[0].skills
    return skill

  }

  async findOne(id: number): Promise<user | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user
  }

  async countByID(id: number): Promise<number | null> {
    return await this.prisma.user.count({ where: { id } })
  }

  async countByEmail(email: string | undefined): Promise<number> {
    return await this.prisma.user.count({
      where: {
        email,
      },
    });
  }


  async findByEmail(email: string): Promise<user | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findEmailById(id: number): Promise<Pick<user, 'email'> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { email: true }
    })
  }


  async update(id: number, updateuserDto: UpdateUserDto): Promise<Pick<user, 'id'> | null> {
  const { password, profile, ...rest } = updateuserDto;
  
  const { id: _id, created_at, updated_at, role, is_validated, ...safeRest } = rest as any;
  const { id: _pid, created_at: _pca, updated_at: _pua, adress_id, adress, ...safeProfile } = profile as any;
  const { id: _aid, created_at: _aca, updated_at: _aua, ...safeAdress } = adress as any;

  return await this.prisma.user.update({
    where: { id },
    data: {
      ...safeRest,
      ...(password && { password: await bcrypt.hash(password, 10) }),
      profile: {
        update: {
          ...safeProfile,
          adress: {
            update: safeAdress
          }
        }
      }
    }
  });
}

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
    console.log(`L'utilisateur ${id} a été supprimé`);
  }
}
