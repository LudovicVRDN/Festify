import { IsEmail, IsEnum, isEnum, IsNotEmpty, IsStrongPassword } from "class-validator";
import { role } from "prisma/generated/prisma/enums";

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
}
