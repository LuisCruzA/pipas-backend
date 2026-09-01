import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service.js';
import { VehiclesController } from './controllers/vehicles.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity.js';

@Module({
  //registramos la entidad vehicle
  imports:[
TypeOrmModule.forFeature([Vehicle])
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController]
})
export class VehicleModule {}
