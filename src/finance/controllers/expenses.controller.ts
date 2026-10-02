import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateExpenseDto } from '../dto/create-expense.dto.js';
import { UpdateExpenseDto } from '../dto/update-expense.dto.js';
import { ExpensesService } from '../services/expenses.service.js';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('api/expenses')
export class ExpensesController {

     //inyeccion de dependencias para usar los servcios de expense
    constructor(private expenseService: ExpensesService){}

    @Get()
    getAll(){
        return this.expenseService.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseUUIDPipe) id:string){
        return this.expenseService.findOne(id);
    }

    @Post()
    create(@Body() body:CreateExpenseDto){
        return this.expenseService.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id:string, @Body() body:UpdateExpenseDto){
        return this.expenseService.update(body, id);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id:string){
        return this.expenseService.delete(id);
    }
}
