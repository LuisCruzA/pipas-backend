import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // Inyectamos el JwtService para leer el token y el ConfigService para sacar el secreto del .env
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Interceptamos la petición (Request) que viene de Postman/Frontend
    const request = context.switchToHttp().getRequest();
    
    // 2. Extraemos el token usando la función auxiliar de abajo
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No tienes permiso para entrar aquí. Falta el token.');
    }
    
    try {
      // 3. Verificamos que el token sea auténtico y no haya caducado
      const secret = this.configService.get<string>('JWT_secret');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      
      // 4. ¡Magia! Pegamos los datos del usuario (id, rol, email) a la petición.
      // Así, tus controladores de ingresos/gastos sabrán exactamente quién hizo la petición.
      request['user'] = payload;
    } catch {
      // Si el token es inventado, o ya pasó 1 día y caducó, cae aquí.
      throw new UnauthorizedException('El token es inválido o ya expiró.');
    }
    
    // Si llega hasta aquí, le abrimos la puerta
    return true;
  }

  // Función auxiliar que saca el token del formato "Bearer eyJhbGci..."
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}