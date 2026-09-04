import { TipoMaterial,TipoServicio, CapacidadPipa } from "../enums/incomes.enum.js";

export interface IIncome{
    fecha:Date,
    tipo_servicio:TipoServicio,
    vehiculoId?:string,
    empleadoId?:string,
    cantidad_horas?:number,
    cantidad_viajes?:number
    cantidad_garrafones?:number,
    capacidad_pipa?:CapacidadPipa,
    tipo_material?:TipoMaterial,
    monto_total:number,
    nota_url?:string,

}