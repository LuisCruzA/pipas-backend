import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service.js';
import { AuthController } from './controllers/auth.controller.js';
import {UserModule} from '../user/user.module.js'
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[UserModule,//importamos el modulo de usuarios
    JwtModule.registerAsync({
      global:true,
      imports: [ConfigModule], // Le decimos que use el módulo de configuración
      inject: [ConfigService], // Inyectamos el servicio
      useFactory: (configService: ConfigService) => ({
        // 3. Ahora leemos la variable de forma segura
        secret: configService.get<string>('JWT_secret'), 
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
