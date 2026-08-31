// src/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Iuser } from '../interfaces/user.interface.js';
import { RolUsuario, EstadoUsuario } from '../enums/user.enum.js';

export class CreateUserDto implements Iuser {
  
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  // Primero transforma a minúsculas, luego valida que sea un enum permitido
  @Transform(({ value }) => value?.toLowerCase())
  @IsEnum(RolUsuario, { message: 'El rol debe ser admin, chofer u operador' })
  @IsNotEmpty()
  rol: RolUsuario;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsOptional()
  numeroLicencia?: string;

  @IsDateString()
  @IsOptional()
  vigencia?: Date;

  @IsEnum(EstadoUsuario)
  @IsNotEmpty()
  estado: EstadoUsuario;
}