import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateIncomeDto } from '../dto/create-income.dto.js';
import { UpdateIncomeDto } from '../dto/update-income.dto.js';
import { IncomesService } from '../services/incomes.service.js';

@Controller('api/incomes')
export class IncomesController {

        constructor(private incomeServices: IncomesService){}

    @Get()
    getAll(){
        return this.incomeServices.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id:string){
        return this.incomeServices.findOne(id);
    }

    @Post()
    create(@Body() body:CreateIncomeDto){
        return this.incomeServices.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateIncomeDto){
        return this.incomeServices.update(id,body);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return this.incomeServices.delete(id);
    }
}
