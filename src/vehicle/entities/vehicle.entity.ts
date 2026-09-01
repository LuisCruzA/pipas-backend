//entidad de vehiculos 
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { TipoVehicle, EstadoVehicle } from '../enums/vehicle.enum.js';
import { User } from '../../user/entities/user.entity.js';

@Entity('vehiculos')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'varchar', length:150})
    modelo:string;

    @Column({type: 'varchar', length:150})
    marca:string;

    @Column({type: 'varchar', length:105, nullable: true})
    color:string

    @Column({type: 'enum', enum:TipoVehicle })
    tipo:TipoVehicle;

    @Column({type: 'varchar', length:150})
    placas:string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    capacidad:number;

     @Column({type: 'enum', enum:EstadoVehicle})
    estatus:EstadoVehicle;

    @Column({ name: 'responsable_id', type: 'uuid', nullable:true })
    responsableId: string;

    // 2. La relación de muchos a uno conectada a la entidad User
    @ManyToOne(() => User,(user) => user.vehiculosAsignados, {nullable:true})
    @JoinColumn({ name: 'responsable_id' })
    responsable: Relation<User>;


    @CreateDateColumn()
    createdAt:Date;



}