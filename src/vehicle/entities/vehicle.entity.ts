//entidad de vehiculos 
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { TipoVehicle, EstadoVehicle } from '../enums/vehicle.enum.js';
import { User } from '../../user/entities/user.entity.js';
import { ApiProperty } from '@nestjs/swagger';
@Entity('vehiculos')
export class Vehicle {
    @ApiProperty({ description: 'ID único generado automáticamente', example: 'e6ebeb7c-572b-4f5c-9e60-6be2265ee2c1' })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({ description: 'Año o modelo del vehículo', example: '2018' })
    @Column({type: 'varchar', length:150})
    modelo:string;

    @ApiProperty({ description: 'Marca de la unidad', example: 'Kenworth' })
    @Column({type: 'varchar', length:150})
    marca:string;

    @ApiProperty({ description: 'Color de la unidad (Opcional)', example: 'Blanco', required: false })
    @Column({type: 'varchar', length:105, nullable: true})
    color:string

    @ApiProperty({ description: 'Clasificación de la unidad', enum: TipoVehicle, example: 'pipa' })
    @Column({type: 'enum', enum:TipoVehicle })
    tipo:TipoVehicle;

    @ApiProperty({ description: 'Placas oficiales', example: 'RX-9900' })
    @Column({type: 'varchar', length:150})
    placas:string;

    @ApiProperty({ description: 'Capacidad de carga en litros', example: 10000.00 })
    @Column({type: 'decimal', precision: 10, scale: 2})
    capacidad:number;

    @ApiProperty({ description: 'Estado actual de operación', enum: EstadoVehicle, example: 'activo' })
     @Column({type: 'enum', enum:EstadoVehicle})
    estatus:EstadoVehicle;

    @ApiProperty({ description: 'ID del empleado asignado (Opcional)', example: 'aa3a62f2-e44e-4eb2-9043-2d3291f68c77', required: false })
    @Column({ name: 'responsable_id', type: 'uuid', nullable:true })
    responsableId: string;

    // 2. La relación de muchos a uno conectada a la entidad User
    @ManyToOne(() => User,(user) => user.vehiculosAsignados, {nullable:true})
    @JoinColumn({ name: 'responsable_id' })
    responsable: Relation<User>;

@ApiProperty({ description: 'Fecha de registro en el sistema' })
    @CreateDateColumn()
    createdAt:Date;



}