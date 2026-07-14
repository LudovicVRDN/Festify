import { IsEmail, IsEnum, isEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { role } from "prisma/generated/prisma/enums";

export class signInDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    password: string;
    @IsEnum(role)
    role: role;
}
