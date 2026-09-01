import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from '../dto/create-vehicle.js';
import { UpdateVehicleDto } from '../dto/update-vehicle.js';


@Injectable()
export class VehiclesService {

    //inyecccion de dependdencias para conexion a la bd
    constructor(@InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>){}

    async findAll(){
        const vehicle = await this.vehicleRepo.find({
            relations:{responsable:true},
            select:{
                id:true,
                marca:true,
                modelo:true,
                color:true,
                tipo:true,
                placas:true,
                capacidad:true,
                estatus:true,
                responsable:{
                    nombre:true
                }


            }
        }); 

        return vehicle;
    }

    async findOne(id:string){
        const vehicle = await this.vehicleRepo.findOneBy({id});

        if(!vehicle){
            throw new Error(`Vehiculo con el ${id} no eonctrado`)

        }

        return vehicle;
    }



    async create(body: CreateVehicleDto){
        const   vehicle =  this.vehicleRepo.create(body);
        return await this.vehicleRepo.save(vehicle);
    }



    async update(id:string, body:UpdateVehicleDto){
        const vehicle = await this.vehicleRepo.preload({
            id:id,
            ...body
        });

         if(!vehicle){
            throw new Error(`Vehiculo con el ${id} no eonctrado`)

        };

        return await this.vehicleRepo.save(vehicle);


    }


    async remove(id:string){
        const vehicle = await this.vehicleRepo.findOneBy({id});
         if(!vehicle){
            throw new Error(`Vehiculo con el ${id} no eonctrado`);

        };

        return await this.vehicleRepo.remove(vehicle);

    }

}
