import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { SignInUserDto } from '../dto/signIn-user.dto.js';
import { UsersService } from '../../user/services/users.service.js';
import { CreateUserDto } from '../../user/dto/create-user.dto.js';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    //inyeccion de dependencias
    constructor (
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body:SignInUserDto){
        return this.authService.login(body.email, body.password);
    }

    @ApiOperation({ summary: 'Registrar un nuevo usuario (admin, chofer u operador)' })
    @Post('register')
    register(@Body() body: CreateUserDto){
        return this.usersService.create(body);
    }
}
