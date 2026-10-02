import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISign } from "../interfaces/signIn.interface.js";


export class SignInUserDto implements ISign{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password: string;
}