import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { IExpense } from "../interfaces/expense.interface.js";
import { Transform, Type } from "class-transformer";
import { CategoriaGasto } from "../enums/expenses.enum.js";


export class CreateExpenseDto implements IExpense{

    @Type(()=> Date)
    @IsDate()
    @IsNotEmpty()
    fecha:Date

     @Transform(({ value }) => value?.toLowerCase())
            @IsEnum(CategoriaGasto , { message: 'la categoria debe ser combustible, insumos, sueldos, refacciones, taller, otro' })
            @IsNotEmpty()
            categoria: CategoriaGasto;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    monto:number

    @IsString()
    @IsNotEmpty()
    descripcion: string;

     @IsUUID()
    @IsOptional()
    vehiculoId:string;


        @IsUUID()
        @IsOptional()
        empleadoId:string;
    
         @IsString()
        @IsOptional()
        comprobante_url: string;


    
}