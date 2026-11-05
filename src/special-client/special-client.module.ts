import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialClient } from './entities/special-client.entity.js';
import { Incomes } from '../finance/entities/incomes.entity.js';
import { SpecialClientService } from './services/special-client.service.js';
import { SpecialClientController } from './controllers/special-client.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialClient, Incomes])],
  controllers: [SpecialClientController],
  providers: [SpecialClientService],
  exports: [SpecialClientService, TypeOrmModule],
})
export class SpecialClientModule {}
