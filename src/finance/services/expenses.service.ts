import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenses } from '../entities/expenses.entity.js';
import { Repository } from 'typeorm';
import { error } from 'console';
import { CreateExpenseDto } from '../dto/create-expense.dto.js';
import { UpdateExpenseDto } from '../dto/update-expense.dto.js';

@Injectable()
export class ExpensesService {
    //inyeccion de dependencias de la entidad expenses
    constructor(@InjectRepository(Expenses) private expenseRepo: Repository<Expenses>){};


    async findAll(){
        const expense  = await this.expenseRepo.find();

        return expense;
    }


    async findOne(id:string){
        const expense = await this.expenseRepo.findOne({
                where:{id:id},
                relations:{empleado:true, vehiculo:true},

                select:{
                    id:true,
                    fecha:true,
                    categoria:true,
                    comprobante_url:true,
                    descripcion:true,
                    monto:true,
                    empleado:{
                         nombre:true
                    },
                    vehiculo:{
                        marca:true,
                        placas:true,
                        tipo:true
                    }
                }

        });
        if(!expense){
            throw new Error(`El gasto con el ${id} no ha llegado`)
        };
         return expense;
    }

    async create(body:CreateExpenseDto){
        const expense = this.expenseRepo.create(body);

        return await this.expenseRepo.save(expense);

    }

    async update(body:UpdateExpenseDto, id:string){
        const expense = await this.expenseRepo.preload({
            id:id,
            ...body

        })
        if(!expense){
            throw new Error(`El gasto con el ${id} no ha llegado`)
        };

        return await this.expenseRepo.save(expense);

    }

    async delete(id:string){
        const expense = await this.expenseRepo.findOneBy({id});

         if(!expense){
            throw new Error(`El gasto con el ${id} no ha llegado`)
        };

        return await this.expenseRepo.remove(expense);
    }


}
