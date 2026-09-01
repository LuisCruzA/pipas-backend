//entidades schema para la tabla de usuarios
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { RolUsuario, EstadoUsuario } from '../enums/user.enum.js';
import { Vehicle } from '../../vehicle/entities/vehicle.entity.js';

import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class User{

  @ApiProperty({ description: 'ID único generado automáticamente', example: 'aa3a62f2-e44e-4eb2-9043-2d3291f68c77' })
@PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre completo del empleado', example: 'Carlos Mendoza' })
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ApiProperty({ description: 'Nivel de acceso en el sistema', enum: RolUsuario, example: 'chofer' })
  @Column({ type: 'enum', enum: RolUsuario })
  rol: RolUsuario;

  @ApiProperty({ description: 'Número de contacto a 10 dígitos', example: '9511234567' })
  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @ApiProperty({ description: 'Folio de la licencia de conducir', example: 'OAX-987654321', required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  numeroLicencia: string;

  @ApiProperty({ description: 'Fecha de vencimiento de la licencia', example: '2028-12-31T00:00:00.000Z', required: false })
  @Column({ type: 'timestamp', nullable: true })
  vigencia: Date;

  @ApiProperty({ description: 'Estado actual del empleado', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO, example: 'activo' })
  @Column({ type: 'enum', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO })
  estado: EstadoUsuario;

  // Esta es la conexión inversa (Virtual)
    @OneToMany(() => Vehicle, (vehiculo) => vehiculo.responsable)
    vehiculosAsignados: Relation<Vehicle[]>;
    
    @ApiProperty({ description: 'Fecha de registro en el sistema' })
  @CreateDateColumn()
  createdAt: Date;
}