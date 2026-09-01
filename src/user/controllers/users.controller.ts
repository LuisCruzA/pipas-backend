import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';


@Controller('api/users')
export class UsersController {

    //inyeccoin de dependencias 

    constructor(private userServices: UsersService){}

    //@Body extrae el paquete completo de datos (el JSON), 
    // @Param captura variables estructurales obligatorias dentro de la ruta,
    //  y @Query recoge los filtros opcionales al final de la URL para afinar la petición.
    @Get()
    getAll(){
        return this.userServices.findAll()
    }

    @Get(':id/vehicles')
    getUserVehicles(@Param('id', ParseUUIDPipe) id:string ){
        return this.userServices.findUserWithVehicles(id)
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id:string){
        return this.userServices.findOne(id)

    }

    @Post()
    create(@Body() body:CreateUserDto){
        return this.userServices.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateUserDto ){
        return this.userServices.update(id,body)
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id:string){
        return this.userServices.remove(id)
    }
}
