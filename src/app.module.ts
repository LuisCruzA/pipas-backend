import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module.js';
import { FinanceModule } from './finance/finance.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { StaticsModule } from './statics/statics.module.js';
import { NoteModule } from './note/note.module.js';
import { SpecialClientModule } from './special-client/special-client.module.js';


@Module({
  imports: [//conexion global de typeOrm con soporte para Railway y desarrollo local
     TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            ssl:
              process.env.NODE_ENV === 'production' ||
              process.env.DATABASE_URL.includes('railway')
                ? { rejectUnauthorized: false }
                : false,
          }
        : {
            host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
            port: Number(process.env.DB_PORT || process.env.PGPORT || 5433),
            username: process.env.DB_USER || process.env.PGUSER || 'admin',
            password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
            database: process.env.DB_NAME || process.env.PGDATABASE || 'pipas_db',
          }),
      autoLoadEntities: true,
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),//lee el .env
    UserModule,
    VehicleModule,
    FinanceModule,
    AuthModule,
    StaticsModule,
    NoteModule,
    SpecialClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

//comandos para crear las carpetas y archivos necesarios para la modularizacion
//nest g mo task modulo
//nest g s task/services/tasks --flat servicio
//nest g co task/controllers/tasks --flat controlaodr