import { RolUsuario, EstadoUsuario } from "../enums/user.enum.js";

export interface Iuser{
    nombre: string,
    rol:RolUsuario,
    telefono:string,
    numeroLicencia?:string,
    vigencia?:Date,
    estado:EstadoUsuario,
}