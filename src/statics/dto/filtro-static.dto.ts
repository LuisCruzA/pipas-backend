import { IsDateString, IsOptional } from "class-validator";
import { IStatic } from "../interfaces/filtroFecha.interface.js";


export class FilterStaticsDto implements IStatic{
    @IsOptional()
    @IsDateString()
    fechaInicio?: string;


    @IsOptional()
    @IsDateString()
    fechaFin?: string;

     @IsOptional()
    @IsDateString()
    date?: string;

   

}