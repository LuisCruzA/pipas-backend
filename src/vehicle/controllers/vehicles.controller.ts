import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { VehiclesService } from '../services/vehicles.service.js';
import { CreateVehicleDto } from '../dto/create-vehicle.js';
import { UpdateVehicleDto } from '../dto/update-vehicle.js';

@Controller('api/vehicles')
export class VehiclesController {
    //inyeccion de dependecias
    constructor(private vehicleServices: VehiclesService){}


    @Get()
    getAll(){
        return this.vehicleServices.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id:string){
        return this.vehicleServices.findOne(id)
        
    }

    @Post()
    create(@Body() body:CreateVehicleDto){
        return this.vehicleServices.create(body)
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateVehicleDto){
        return this.vehicleServices.update(id,body)
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return this.vehicleServices.remove(id)
    }
}
