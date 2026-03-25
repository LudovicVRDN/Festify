import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class signInDTO {
    @IsNotEmpty()
    @IsString()
    email:string;
     @IsNotEmpty()
    @IsString()
    password : string;
}
