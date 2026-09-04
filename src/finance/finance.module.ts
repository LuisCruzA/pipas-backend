import { Module } from '@nestjs/common';
import { IncomesService } from './services/incomes.service.js';
import { ExpensesService } from './services/expenses.service.js';
import { ExpensesController } from './controllers/expenses.controller.js';
import { IncomesController } from './controllers/incomes.controller.js';
import { Incomes } from './entities/incomes.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //importamos las entidades correspondientess
  imports:[
   TypeOrmModule.forFeature ([Incomes])
  ],
  providers: [IncomesService, ExpensesService],
  controllers: [ExpensesController, IncomesController]
})
export class FinanceModule {}
