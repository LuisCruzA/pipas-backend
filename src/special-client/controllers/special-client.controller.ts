import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpecialClientService } from '../services/special-client.service.js';
import { CreateSpecialClientDto } from '../dto/create-special-client.dto.js';
import { UpdateSpecialClientDto } from '../dto/update-special-client.dto.js';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard.js';

@ApiTags('Clientes Especiales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(['api/special-clients', 'api/clients'])
export class SpecialClientController {
  constructor(private readonly clientService: SpecialClientService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los clientes especiales' })
  @ApiQuery({
    name: 'activo',
    required: false,
    type: Boolean,
    description: 'Filtrar por estatus activo (true/false)',
  })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT faltante o inválido' })
  findAll(@Query('activo') activo?: string) {
    const isActivo = activo === undefined ? undefined : activo === 'true';
    return this.clientService.findAll(isActivo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente especial por su UUID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente especial' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de validación inválidos' })
  create(@Body() body: CreateSpecialClientDto) {
    return this.clientService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente especial existente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateSpecialClientDto,
  ) {
    return this.clientService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente especial por su UUID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.remove(id);
  }
}
