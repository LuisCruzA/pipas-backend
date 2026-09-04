import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incomes } from '../entities/incomes.entity.js';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from '../dto/create-income.dto.js';
import { UpdateIncomeDto } from '../dto/update-income.dto.js';

@Injectable()
export class IncomesService {

    //inyeccion de dependencias de la entidad Incomes BD
    constructor(@InjectRepository(Incomes) private incomeRepo: Repository<Incomes>){}


   async findAll(){
     const income = await this.incomeRepo.find();
     
     return income

    }


    async findOne(id:string){
        const income = await this.incomeRepo.findOne({
            where:{id:id},
            relations:{responsable:true, vehiculo:true},
 select:{
            id:true,
            fecha:true,
            tipo_servicio:true,
            cantidad_horas:true,
            cantidad_viajes:true,
            cantidad_garrafones:true,
            capacidad_pipa:true,
            tipo_material:true,
            monto_total:true,
            nota_url:true,
            responsable:{
                nombre:true
            },
            vehiculo:{
                marca:true,
                placas:true,
                tipo:true

            }
        }

        });

        if(!income){
            throw new Error(`Ingreso con el ${id} no encontrado`)
        };

        return income;
    }

    async create(body:CreateIncomeDto){
        const income =  this.incomeRepo.create(body);

        return await this.incomeRepo.save(income);
    }

    async update(id:string, body:UpdateIncomeDto){
        const income = await this.incomeRepo.preload({
            id:id,
            ...body
        })

        if(!income){
            throw new Error(`Ingreso con el ${id} no encontrado`)
        };

        return await this.incomeRepo.save(income);
    }

    async delete(id:string){
        const income = await this.incomeRepo.findOneBy({id})

        if(!income){
            throw new Error(`Ingreso con el ${id} no encontrado`)
        };

        return await this.incomeRepo.remove(income);
    }


}
