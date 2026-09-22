import { CategoriaGasto } from "../enums/expenses.enum.js";
export interface IExpense{
        fecha:Date,
        categoria: CategoriaGasto,
        monto:number,
        descripcion:string,
        vehiculoId?:string,
        empleadoId?:string,
        comprobante_url?:string

}