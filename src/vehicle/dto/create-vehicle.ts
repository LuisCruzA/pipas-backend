import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber, IsUUID, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { IVehicle } from '../interfaces/vehicle.interface.js';
import { TipoVehicle, EstadoVehicle } from '../enums/vehicle.enum.js';

export class CreateVehicleDto implements IVehicle{

    @IsString()
    @IsNotEmpty()
    modelo:string;

     @IsString()
    @IsNotEmpty()
    marca:string;

     @IsString()
    @IsOptional()
    color:string;

    @Transform(({ value }) => value?.toLowerCase())
  @IsEnum(TipoVehicle, { message: 'El tipo debe ser pipa, volteo, retro u carro_garrafon' })
  @IsNotEmpty()
  tipo: TipoVehicle;

     @IsString()
    @IsNotEmpty()
    placas:string;

     @IsNumber()
     @IsPositive()
    @IsNotEmpty()
    capacidad:number;

@Transform(({ value }) => value?.toLowerCase())
  @IsEnum(EstadoVehicle, { message: 'El estatus debe ser activo, taller u inactivo' })
  @IsNotEmpty()
  estatus: EstadoVehicle;


    @IsUUID()
    @IsOptional()
        responsableId:string;


}