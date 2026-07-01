import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateMissionDto {

    @IsString()
    title!: string
    @IsNumber()
    volunteer_needed!: number
    @IsString()
    description!: string
    @IsDate()
    @Type(() => Date)
    time_start!:Date
    @IsDate()
    @Type(() => Date)
    time_end!:Date
}
