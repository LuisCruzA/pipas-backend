import { Injectable, Param, ParseDatePipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incomes } from '../../finance/entities/incomes.entity.js';
import { IsNull, Not, Repository, FindOptionsWhere, Between } from 'typeorm';
import { Expenses } from '../../finance/entities/expenses.entity.js';
import { User } from '../../user/entities/user.entity.js';
import { Vehicle } from '../../vehicle/entities/vehicle.entity.js';
import { EstadoVehicle } from '../../vehicle/enums/vehicle.enum.js';
import { FilterStaticsDto } from '../dto/filtro-static.dto.js';
import { parseDateRange } from '../../helpers/index.js';

@Injectable()
export class StaticsService {
  //inyeccion de dependencias de la entidad Incomes y Expneses BD
    constructor(@InjectRepository(Incomes) private readonly incomesRepo: Repository<Incomes>,
                @InjectRepository(Expenses) private readonly expenseRepo: Repository<Expenses>,
                @InjectRepository(User) private readonly usersRepo: Repository<User>,
                @InjectRepository(Vehicle) private readonly vehiclesRepo: Repository<Vehicle>){}

    async getIngresoTotal(){
        const resultado = await this.incomesRepo.createQueryBuilder('incomes')
        .select('SUM(incomes.monto_total)', 'dineroTotal')
        .getRawOne()

        return{ totalIncomes: Number(resultado.dineroTotal) || 0}
    }


    async getGastoTotal(){
        const resultado = await this.expenseRepo.createQueryBuilder('expenses')
        .select('SUM(expenses.monto)', 'montoTotal')
        .getRawOne()
        

        return{
            totalExpenses: Number(resultado.montoTotal) || 0 
        }
    }


    async GetDashboardResume(){
        const [userTotal, vehiclesTotal, vehiculosActivos, vehiculosEnTaller, vehiculoAsignados, ] = await Promise.all([

            this.usersRepo.count(),

            this.vehiclesRepo.count(),

            this.vehiclesRepo.count({
                where:{estatus: EstadoVehicle.ACTIVO}
            }),

            this.vehiclesRepo.count({
                where:{estatus: EstadoVehicle.TALLER}
            }),

            this.vehiclesRepo.count({
                where:{responsableId: Not(IsNull())}
            })
        ])

        return{
            userTotal,
            vehiclesTotal,
            vehiculosActivos,
            vehiculosEnTaller,
            vehiculoAsignados
        }
    }



    async GetIngresoResume(fechas:FilterStaticsDto){

        const {fechaFin, fechaInicio, date} = fechas

        let queryOptions : FindOptionsWhere<Incomes> = {}

        if(fechas){
            if(date){
                const range = parseDateRange({from: date, to:date});
                queryOptions={
                    ...queryOptions,
                    fecha: Between(range.from, range.to)
                }
            }
            else if(fechaInicio && fechaFin){
                const range = parseDateRange({from:fechaInicio, to: fechaFin});
                queryOptions={
                    ...queryOptions,
                    fecha:Between(range.from, range.to)
                }
            }
            else{
                const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      
      const hoyStr = `${año}-${mes}-${dia}`;
      
      const range = parseDateRange({ from: hoyStr, to: hoyStr });
      queryOptions = {
        ...queryOptions,
        fecha: Between(range.from, range.to),
      };
            }

        }

        

        const resultado  = await this.incomesRepo.sum('monto_total', queryOptions)

        return {
            montoTotal: Number(resultado) || 0
        }
    }


     async GetGastoResume(fechas:FilterStaticsDto){

        const {fechaFin, fechaInicio, date} = fechas

        let queryOptions : FindOptionsWhere<Expenses> = {}

        if(fechas){
            if(date){
                const range = parseDateRange({from: date, to:date});
                queryOptions={
                    ...queryOptions,
                    fecha: Between(range.from, range.to)
                }
            }
            else if(fechaInicio && fechaFin){
                const range = parseDateRange({from:fechaInicio, to: fechaFin});
                queryOptions={
                    ...queryOptions,
                    fecha:Between(range.from, range.to)
                }
            }
            else{
                const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      
      const hoyStr = `${año}-${mes}-${dia}`;
      
      const range = parseDateRange({ from: hoyStr, to: hoyStr });
      queryOptions = {
        ...queryOptions,
        fecha: Between(range.from, range.to),
      };
            }

        }

        const resultado  = await this.expenseRepo.sum('monto', queryOptions)

        return {
            montoTotal: Number(resultado) || 0
        }
    }

}


   