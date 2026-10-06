import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EstadoNota } from "../enums/note.enum.js";

@Entity('notas')
export class Note{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar', length:150})
    titulo:string;
    
    @Column({type:'text' })
    descripcion:string;

    @Column({type:'enum', enum:EstadoNota})
    estatus:EstadoNota;

    @CreateDateColumn()
    createdAt: Date


}