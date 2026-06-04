import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMissionDto {

    @IsString()
    title!: string
    @IsNumber()
    volunteer_needed!: number
    @IsString()
    description!: string
}
