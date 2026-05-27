import { Type } from "class-transformer";
import { IsDate, IsString, ValidateNested } from "class-validator";
import { CreateAdressDto } from "src/user/dto/create-user.dto";

export class CreateFestivalDto {
    @IsDate()
    @Type(() => Date)
    start_date!: Date
    @IsDate()
    @Type(() => Date)
    end_date!: Date
    @IsString()
    name!: string
    @ValidateNested()
    @Type(() => CreateAdressDto)
    adress!: CreateAdressDto
}
