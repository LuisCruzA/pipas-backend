import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module.js';
import { FinanceModule } from './finance/finance.module.js';


@Module({
  imports: [//conexion global de typeOrm, no mover
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: 'postgres',
      database: 'pipas_db',
autoLoadEntities: true,
      synchronize: true,
      retryDelay: 3000,
      retryAttempts:10
    }),
    UserModule,
    VehicleModule,
    FinanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

//comandos para crear las carpetas y archivos necesarios para la modularizacion
//nest g mo task modulo
//nest g s task/services/tasks --flat servicio
//nest g co task/controllers/tasks --flat controlaodr