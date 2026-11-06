import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
//herramientas de swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS para permitir peticiones desde Flutter Web o cualquier origen
  app.enableCors({
    origin: '*', // O la URL definitiva que te dé Railway para el front
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Activación del escudo de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    })
  );

  // Configura el título y descripción de tu API
  const config = new DocumentBuilder()
    .setTitle('API Agua El Montecito')
    .setDescription('Documentación de los endpoints para vehículos y usuarios')
    .setVersion('1.0')
    .build();

    //Genera el documento y define la ruta en el navegador
   const document = SwaggerModule.createDocument(app, config); // 'api-docs' será la URL de acceso
  SwaggerModule.setup('api-docs', app, document);

  const primaryPort = Number(process.env.PORT) || 3000;
  await app.listen(primaryPort, '0.0.0.0');
  console.log(`🚀 Backend successfully listening on 0.0.0.0:${primaryPort}`);
  console.log(`📚 Swagger documentation at /api-docs`);

  // Escuchar también en 3000 y 8080 como puertos de respaldo para evitar cualquier desajuste de Railway
  const portsToListen = [3000, 8080].filter((p) => p !== primaryPort);
  const expressApp = app.getHttpAdapter().getInstance();

  for (const altPort of portsToListen) {
    try {
      const server = http.createServer(expressApp);
      server.listen(altPort, '0.0.0.0', () => {
        console.log(`🚀 Multi-port listener active on 0.0.0.0:${altPort}`);
      });
      server.on('error', (err: any) => {
        if (err.code !== 'EADDRINUSE') {
          console.warn(`Alt port ${altPort} note:`, err.message);
        }
      });
    } catch {
      // Ignorar si el puerto ya está en uso
    }
  }
}
await bootstrap();

