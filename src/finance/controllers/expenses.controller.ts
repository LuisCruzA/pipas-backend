import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateExpenseDto } from '../dto/create-expense.dto.js';
import { UpdateExpenseDto } from '../dto/update-expense.dto.js';
import { ExpensesService } from '../services/expenses.service.js';

@Controller('api/expenses')
export class ExpensesController {

     //inyeccion de dependencias para usar los servcios de expense
    constructor(private expenseService: ExpensesService){}

    @Get()
    getAll(){
        return ''
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id:string){
        return ''

    }

    @Post()
    create(@Body() body:CreateExpenseDto){
        return''
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateExpenseDto){

        return ''
    }

  
    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return ''
    }

}
