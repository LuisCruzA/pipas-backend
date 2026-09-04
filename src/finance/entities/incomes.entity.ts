import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { TipoMaterial, TipoServicio, CapacidadPipa } from '../enums/incomes.enum.js';
import { User } from '../../user/entities/user.entity.js';
import type { Relation } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity.js';


@Entity('ingresos')
export class Incomes{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'timestamp'})
    fecha:Date

    @Column({type:'enum', enum:TipoServicio})
    tipo_servicio:TipoServicio;

    @Column({type: 'decimal', precision: 5, scale: 2, nullable:true})
    cantidad_horas:number;

    @Column({type:'int', nullable:true})
    cantidad_viajes:number;

    @Column({type:'int', nullable:true})
    cantidad_garrafones:number;

    @Column({type:'enum', enum:CapacidadPipa, nullable:true})
    capacidad_pipa: CapacidadPipa;

     @Column({type:'enum', enum:TipoMaterial, nullable:true})
        tipo_material: TipoMaterial;

    @Column({type:'decimal', precision:10, scale:2})
    monto_total:number;

    @Column({type:'varchar', length:5000, nullable:true})
        nota_url:string

    @Column({name:'empleado_id', type:'uuid', nullable:true})
    empleadoId:string;

    @ManyToOne(()=> User,{nullable:true})
    @JoinColumn({name:'empleado_id'})
    responsable: Relation<User>


    @Column({name:'vehicle_id', type:'uuid', nullable:true})
    vehiculoId:string

    @ManyToOne(()=> Vehicle,{nullable:true})
    @JoinColumn({name:'vehicle_id'})
    vehiculo: Relation<Vehicle>


    

}
