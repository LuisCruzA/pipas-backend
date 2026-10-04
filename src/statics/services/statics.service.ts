import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incomes } from '../../finance/entities/incomes.entity.js';
import { Repository } from 'typeorm';
import { Expenses } from '../../finance/entities/expenses.entity.js';

@Injectable()
export class StaticsService {
  //inyeccion de dependencias de la entidad Incomes y Expneses BD
    constructor(@InjectRepository(Incomes) private readonly incomesRepo: Repository<Incomes>,
                @InjectRepository(Expenses) private readonly expenseRepo: Repository<Expenses>){}

    async ingresoTotal(){
        const resultado = await this.incomesRepo.createQueryBuilder('incomes')
        .select('SUM(incomes.monto_total)', 'dineroTotal')
        .getRawOne()

        return{ totalIncomes: Number(resultado.dineroTotal) || 0}
    }


    async gastoTotal(){
        const resultado = await this.expenseRepo.createQueryBuilder('expenses')
        .select('SUM(expenses.monto)', 'montoTotal')
        .getRawOne()

        return{
            totalExpenses: Number(resultado.montoTotal) || 0 
        }
    }

}
 