import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
//herramientas de swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
await bootstrap();
