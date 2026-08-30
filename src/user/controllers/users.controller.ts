import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';

@Controller('api/users')
export class UsersController {

    //inyeccoin de dependencias 
    constructor(private userServices: UsersService){}

    @Get()
    getAll(){
        return this.userServices.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.userServices.findOne(id)

    }

    @Post()
    create(@Body() body:any){
        return this.userServices.create(body);
    }
}
