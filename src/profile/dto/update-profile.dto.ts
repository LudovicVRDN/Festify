import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from 'src/user/dto/create-user.dto';


export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
