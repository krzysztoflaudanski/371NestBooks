import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/utils/match.decorator";


export class RegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'Min length 5' })
    @MaxLength(40, { message: 'Max length 40' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5, { message: 'Min length 5' })
    @MaxLength(40, { message: 'Max length 40' })
    @Match('password')
    passwordRepeat: string;
}