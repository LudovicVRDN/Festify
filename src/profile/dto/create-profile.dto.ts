import { IsDate, IsDateString, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    firstname :string
    @IsString()
    lastname : string
    @IsDateString()
    birthdate : Date
}
