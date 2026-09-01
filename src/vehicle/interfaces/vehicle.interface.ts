import { TipoVehicle, EstadoVehicle } from "../enums/vehicle.enum.js";

export interface IVehicle{
    modelo:string,
    marca:string,
    color?:string,
    tipo:TipoVehicle,
    placas:string,
    capacidad:number,
    estatus:EstadoVehicle,
    responsableId?: string;
}