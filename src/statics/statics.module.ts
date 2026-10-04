import { Module } from '@nestjs/common';
import { StaticsService } from './services/statics.service.js';
import { StaticsController } from './controllers/statics.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incomes } from '../finance/entities/incomes.entity.js';
import { Expenses } from '../finance/entities/expenses.entity.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Incomes, Expenses])
  ],
  providers: [StaticsService],
  controllers: [StaticsController]
})
export class StaticsModule {}
