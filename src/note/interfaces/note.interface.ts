import { EstadoNota } from "../enums/note.enum.js";

export interface INote{
    titulo:string,
    descripcion:string,
    estatus:EstadoNota,
}