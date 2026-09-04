import { Transform } from "class-transformer";
import { IIncome } from "../interfaces/income.interface.js";
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID, IsNumber, IsPositive } from 'class-validator';
import { CapacidadPipa, TipoMaterial, TipoServicio } from "../enums/incomes.enum.js";



export class CreateIncomeDto implements IIncome{
    @IsDateString()
      @IsNotEmpty()
      fecha: Date;

      @Transform(({ value }) => value?.toLowerCase())
        @IsEnum(TipoServicio , { message: 'El tipo servicio debe ser pipa de agua,garrafon de agua, maquinaria u volteo' })
        @IsNotEmpty()
        tipo_servicio: TipoServicio;

          @IsUUID()
          @IsOptional()
                vehiculoId:string;
    @IsUUID()
    @IsOptional()
    empleadoId:string;

     @IsNumber()
         @IsPositive()
        @IsOptional()
        cantidad_horas: number;

        @IsNumber()
         @IsPositive()
        @IsOptional()
        cantidad_viajes: number;

        @IsNumber()
         @IsPositive()
        @IsOptional()
        cantidad_garrafones: number;

        @Transform(({ value }) => value?.toLowerCase())
        @IsEnum(CapacidadPipa)
        @IsOptional()
        capacidad_pipa: CapacidadPipa;

        @Transform(({ value }) => value?.toLowerCase())
        @IsEnum(TipoMaterial)
        @IsOptional()
        tipo_material: TipoMaterial ;

        @IsNumber()
        @IsPositive()
        @IsNotEmpty()
        monto_total: number;

        @IsString()
        @IsOptional()
        nota_url: string;


}