import { Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NewPassword, UpdatePassword, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { adress, festival, Prisma } from 'prisma/generated/prisma/client';
import { skills, user } from 'prisma/generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdressService } from 'src/adress/adress.service';


export type UserWithSkills = Prisma.userGetPayload<{
  include: {
    skills_has_user: {
      include: { skills: true }
    }
  }
}>
export interface ISkillResponse {
  name: string;
  description: string;
}

export interface IAdress {
  city:string,
  street:string,
  postalCode:string
}

export interface IFestivalResponse{
   id:number;
   name:string;
   start_date:Date;
   end_date:Date;
   adress: IAdress
   
}

@Injectable()


export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService : JwtService ,
    private configService : ConfigService,
    private adressService : AdressService
  ) { }
  

  async create(createuserDto: CreateUserDto): Promise<user> {
    const { password, profile, ...rest } = createuserDto
    const hashedPassword = await bcrypt.hash(createuserDto.password, 10)
    const user: user = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
        profile: {
          create: {
            firstname: profile!.firstname,
            lastname: profile!.lastname,
            adress: {
              create: profile!.adress
            }
          }
        }
      }
    })
    
    return user
  }

  async findAll(): Promise<user[]> {
    const users = await this.prisma.user.findMany()
  
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

  async findUsersFestivals(id:number) :Promise<IFestivalResponse[]>{
      const usersFestival = await this.prisma.user.findMany({
      where : {id},
      include:{
        user_has_festival:{
          include:{
            festival : {
              include:{
                adress:true
              }
            }
          }
      }
    }
    })
    return usersFestival[0].user_has_festival.map(f => ({
    id:f.festival_id,
    name: f.festival.name,
    start_date: f.festival.start_date,
    end_date:f.festival.end_date,
    adress :{
      street : f.festival.adress.street,
    city : f.festival.adress.city,
    postalCode : f.festival.adress.postalCode
    } 
    
  }));
  }

  async findUsersOneFestivals(id:number,festivalID:number) :Promise<IFestivalResponse>{
    const usersFestival = await this.prisma.user.findUnique({
      where : {id},
      include:{
        user_has_festival:{
        where:{
          festival_id: festivalID},
          include:{
            festival : {
              include :{
                adress :true
              }
            }
          }
      }
    }
    })
    if(!usersFestival || usersFestival?.user_has_festival.length === 0){
       throw new NotFoundException('Pas de festival pour cet utilisateur');
    }
    const festivals = usersFestival.user_has_festival[0].festival
    return festivals
  }

  async findOne(id: number): Promise<user | null> {
    const user = await this.prisma.user.findUnique({ where: { id }, 
      include:{
        profile:{
          include:{
            adress:true
          }
        }
        
  }})
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


async updatePassword(id:number, updatePassword:UpdatePassword){
    const user = await this.findOne(id);
    if(user){
    if(!await bcrypt.compare(updatePassword.currentPassword,user.password)){
      throw new UnauthorizedException('Requête impossible à résoudre')
    }else{
      const hashedPassword = await bcrypt.hash(updatePassword.newPassword,10)
       return await this.prisma.user.update({
    where: { id },
    data: {
       password : hashedPassword
    }
  });
    }
     }
}

  async resetPassword(token:string ,newPassword:NewPassword):Promise<string>{
     const decoded = this.jwtService.verify(token, {
    secret: this.configService.get("reset_secret")
});
    if (!decoded) throw new UnauthorizedException('Token invalide');

    await this.prisma.user.update({
        where: { email: decoded.email },
        data: {
            password: await bcrypt.hash(newPassword.newPassword, 10),
        }
    });

    return 'Changé avec succès';
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
    console.log(`L'utilisateur ${id} a été supprimé`);
  }
}
