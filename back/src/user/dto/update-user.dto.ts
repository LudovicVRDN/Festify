import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) { }


export class NewPassword {
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    @IsNotEmpty()
    newPassword!: string;
}

export class UpdatePassword{
    currentPassword!:string
       @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    @IsNotEmpty()
    newPassword!: string;
}