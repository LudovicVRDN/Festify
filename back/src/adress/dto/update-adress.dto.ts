import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressDto } from 'src/user/dto/create-user.dto';


export class UpdateAdressDto extends PartialType(CreateAdressDto) {}
