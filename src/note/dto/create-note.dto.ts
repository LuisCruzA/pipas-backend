import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { INote } from "../interfaces/note.interface.js";
import { Transform } from "class-transformer";
import { EstadoNota } from "../enums/note.enum.js";


export class CreateNoteDto implements INote{


    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

     @Transform(({ value }) => value?.toLowerCase())
      @IsEnum(EstadoNota, { message: 'El rol debe ser info, pendiente o resuelto' })
      @IsNotEmpty()
      estatus: EstadoNota;
      
}