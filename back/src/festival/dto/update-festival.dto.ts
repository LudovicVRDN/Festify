import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFestivalDto } from './create-festival.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAdressDto } from 'src/adress/dto/update-adress.dto';

export class UpdateFestivalDto extends PartialType(OmitType(CreateFestivalDto, ['adress'] as const) ) {
    @IsOptional()    
    @ValidateNested()
    @Type(() => UpdateAdressDto) // ← on écrase le type hérité de CreateFestivalDto
    adress?: UpdateAdressDto;

}
