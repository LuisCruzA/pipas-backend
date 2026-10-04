import { Controller, Get } from '@nestjs/common';
import { StaticsService } from '../services/statics.service.js';

@Controller('api/statics')
export class StaticsController {

    //iyeccion de dependencias para utilizar los servicios de statics
    constructor(private readonly staticsService: StaticsService){}

    @Get('ingreso-total')
    ingresoTotal(){
         return this.staticsService.ingresoTotal();
    }

    @Get('gasto-total')
    gastoTotal(){
        return this.staticsService.gastoTotal()
    }
}
