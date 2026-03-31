import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, isEnum, IsNotEmpty, IsString, IsStrongPassword, ValidateNested } from "class-validator";
import { role } from "prisma/generated/prisma/enums";

export class CreateAdressDto {
   @IsString()
   street : string
   @IsString()
   city: string
   @IsString()
   country : string
}

export class CreateProfileDto {
    @IsString()
    firstname :string
    @IsString()
    lastname : string
    @Transform(({ value }) => new Date(value))
    @IsDate()
    birthdate : Date
    @ValidateNested()
    @Type(()=> CreateAdressDto)
    adress : CreateAdressDto
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsStrongPassword({
        minLength : 8,
        minUppercase : 1,
        minSymbols : 1,
        minNumbers :1
    })
    @IsNotEmpty()
    password : string;
    is_validated : boolean;
    @IsEnum(role)
    role : role;
    @ValidateNested()
    @Type(()=> CreateProfileDto)
    profile :CreateProfileDto
}
