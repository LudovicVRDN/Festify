import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { user } from 'prisma/generated/prisma/client';
import * as bcrypt from 'bcrypt';

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
        // email : email
        email,
      },
    });
  }

  // async countByProfileId(profile_id: number): Promise<number> {
  //   return await this.prisma.user.count({
  //     where: {
  //       profile_id
  //     },
  //   });
  // }


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
    const { password, profile, ...rest } = updateuserDto
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        profile: {
          update: {
            ...profile,
            adress: {
              update: profile?.adress
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
