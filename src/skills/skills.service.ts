import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'http2';
import { skills } from 'prisma/generated/prisma/client';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) { }

  async create(createSkillDto: CreateSkillDto): Promise<skills> {
    const skill = await this.prisma.skills.create({
      data: {
        ...createSkillDto
      }
    })
    return skill
  }

  async createLinkUserAndSkills(
    skillId: number,
    userId: number,
  ) {
    await this.prisma.skills_has_user.create({
      data: {
        user: {
          connect: { id: userId }
        },
        skills: {
          connect: { id: skillId }
        }
      },
    })
    return `Congrats your skills is linked to you ! <3`
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<string> {
    const {...rest } = updateSkillDto;
    const { id: _id, created_at, updated_at,...safeRest } = rest as any;

  await this.prisma.skills.update({
      where:{ id },
      data:{
        ...safeRest
      }
    })
      return `Skill perfectly Updated`
  }

  async remove( id: number,userId: number): Promise<string> {
    await this.prisma.skills_has_user.delete({
      where: {
        skills_id_user_id: {
          skills_id: id,
          user_id: userId,
        }
      }
    })
    await this.prisma.skills.delete({ where: { id } })
    return `Skill deleted perfectly`
  }
  
}
