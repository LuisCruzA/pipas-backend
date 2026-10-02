import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { SignInUserDto } from '../dto/signIn-user.dto.js';

@Controller('api/auth')
export class AuthController {
    //inyeccion de dependencias
    constructor (private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body:SignInUserDto){
        return this.authService.login(body.email, body.password)
    }

}
