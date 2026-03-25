
import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    firstname :string
    @IsString()
    lastname : string
     @Transform(({ value }) => new Date(value))
    @IsDate()
    birthdate : Date
}
