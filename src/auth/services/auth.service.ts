import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../user/services/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    //inyeccion de dependencias
    constructor(private usersService:UsersService, private jwtService:JwtService){}

    async login (email:string, password:string){
        //se busca usuario por correo
        const user = await this.usersService.findByEmailWithPassword(email);


        if(!user || !user.password){
            throw new UnauthorizedException('Correo o contraseña incorrectos')

        }

        const esValida =  await bcrypt.compare(password, user.password)

        if(!esValida){
            throw new UnauthorizedException('Correo o contraseña incorrectos')

        }

        const payload = {sub:user.id, email:user.email, rol:user.rol}

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
