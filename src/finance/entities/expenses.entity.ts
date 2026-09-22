import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { CategoriaGasto } from "../enums/expenses.enum.js";
import { Vehicle } from "../../vehicle/entities/vehicle.entity.js";
import { User } from "../../user/entities/user.entity.js";


@Entity('gastos')
export class Expenses{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'timestamp'})
    fecha:Date

    @Column({type:'enum',enum:CategoriaGasto})
    categoria:CategoriaGasto

    @Column({type:'decimal', precision:10, scale:2})
    monto:number

    @Column({type:'varchar', length:550})
    descripcion:string

    @Column({type:'varchar', length:500, nullable:true})
    comprobante_url:string


    @Column({name:'vehiculo_id', type:'uuid', nullable:true})
    vehiculoId:string
    
    @ManyToOne(()=> Vehicle,{nullable:true})
    @JoinColumn({name:'vehiculo_id'})
    vehiculo: Relation<Vehicle>

    @Column({name:'empleado_id', type:'uuid', nullable:true})
    empleadoId:string

    @ManyToOne(()=>User,{nullable:true})
    @JoinColumn({name:'empleado_id'})
    empleado: Relation<User>

    @CreateDateColumn()
    createdAt: Date

}