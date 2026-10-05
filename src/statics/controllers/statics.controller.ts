import { Controller, Get, Query } from '@nestjs/common';
import { StaticsService } from '../services/statics.service.js';
import { FilterStaticsDto } from '../dto/filtro-static.dto.js';

@Controller('api/statics')
export class StaticsController {

    //iyeccion de dependencias para utilizar los servicios de statics
    constructor(private readonly staticsService: StaticsService){}

    @Get('ingreso-total')
    GetIngresoTotal(){
         return this.staticsService.getIngresoTotal();
    }

    @Get('gasto-total')
    GetGastoTotal(){
        return this.staticsService.getGastoTotal()
    }

    @Get('dashboard-resume')
    GetDashboardResume(){
        return this.staticsService.GetDashboardResume()
    }

    @Get('ingreso-resume')
    GetIngresoResume(@Query() filtro:FilterStaticsDto ){
        return this.staticsService.GetIngresoResume(filtro)
    }

    @Get('gasto-resume')
    GetGastoResume(@Query() filtro:FilterStaticsDto ){
        return this.staticsService.GetGastoResume(filtro)
    }
}
