//entidades schema para la tabla de usuarios
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { RolUsuario, EstadoUsuario } from '../enums/user.enum.js';

@Entity('usuarios')
export class User{
@PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'enum', enum: RolUsuario })
  rol: RolUsuario;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numeroLicencia: string;

  @Column({ type: 'timestamp', nullable: true })
  vigencia: Date;

  @Column({ type: 'enum', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO })
  estado: EstadoUsuario;

  @CreateDateColumn()
  createdAt: Date;
}