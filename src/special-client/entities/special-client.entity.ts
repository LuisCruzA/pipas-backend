import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  FormaPago,
  MetodoPago,
  RegimenFiscal,
  UsoCfdi,
} from '../enums/special-client.enum.js';
import { Incomes } from '../../finance/entities/incomes.entity.js';

@Entity('clientes_especiales')
export class SpecialClient {
  @ApiProperty({
    description: 'ID único del cliente (UUID)',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre comercial o nombre de la empresa',
    example: 'Constructora El Roble S.A. de C.V.',
  })
  @Column({ type: 'varchar', length: 200 })
  nombreEmpresa: string;

  @ApiProperty({
    description: 'Dirección física general o de entrega',
    example: 'Av. Las Palmas #123, Col. Reforma, Oaxaca',
    required: false,
  })
  @Column({ type: 'varchar', length: 300, nullable: true })
  direccion?: string;

  @ApiProperty({
    description: 'Indica si el cliente requiere emisión de factura fiscal',
    example: true,
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  requiereFactura: boolean;

  @ApiProperty({
    description: 'Estado de actividad del cliente en el sistema',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // ---------------------------------------------------------------------------
  // Campos de Facturación (SAT CFDI 4.0)
  // ---------------------------------------------------------------------------

  @ApiProperty({
    description: 'Registro Federal de Contribuyentes (RFC)',
    example: 'XAXX010101000',
    required: false,
  })
  @Column({ type: 'varchar', length: 15, nullable: true })
  rfc?: string;

  @ApiProperty({
    description: 'Nombre o Razón Social registrada ante el SAT',
    example: 'CONSTRUCTORA EL ROBLE SA DE CV',
    required: false,
  })
  @Column({ type: 'varchar', length: 250, nullable: true })
  razonSocial?: string;

  @ApiProperty({
    description: 'Clave del Régimen Fiscal según catálogo SAT CFDI 4.0',
    enum: RegimenFiscal,
    example: RegimenFiscal.REG_601,
    required: false,
  })
  @Column({ type: 'enum', enum: RegimenFiscal, nullable: true })
  regimenFiscal?: RegimenFiscal;

  @ApiProperty({
    description: 'Clave de Uso del CFDI según catálogo SAT CFDI 4.0',
    enum: UsoCfdi,
    example: UsoCfdi.G03,
    required: false,
  })
  @Column({ type: 'enum', enum: UsoCfdi, nullable: true })
  usoCfdi?: UsoCfdi;

  @ApiProperty({
    description: 'Método de pago (PUE o PPD)',
    enum: MetodoPago,
    example: MetodoPago.PUE,
    required: false,
  })
  @Column({ type: 'enum', enum: MetodoPago, nullable: true })
  metodoPago?: MetodoPago;

  @ApiProperty({
    description: 'Clave de la forma de pago habitual según catálogo SAT',
    enum: FormaPago,
    example: FormaPago.TRANSFERENCIA,
    required: false,
  })
  @Column({ type: 'enum', enum: FormaPago, nullable: true })
  formaPago?: FormaPago;

  @ApiProperty({
    description: 'Calle fiscal',
    example: 'Av. Las Palmas',
    required: false,
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  calle?: string;

  @ApiProperty({
    description: 'Número exterior fiscal',
    example: '123',
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  numeroExterior?: string;

  @ApiProperty({
    description: 'Número interior fiscal (si aplica)',
    example: 'Piso 2, Int. B',
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  numeroInterior?: string;

  @ApiProperty({
    description: 'Colonia o asentamiento fiscal',
    example: 'Reforma',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  colonia?: string;

  @ApiProperty({
    description: 'Municipio o delegación / alcaldía fiscal',
    example: 'Oaxaca de Juárez',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  municipio?: string;

  @ApiProperty({
    description: 'Ciudad o localidad',
    example: 'Oaxaca',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  ciudad?: string;

  @ApiProperty({
    description: 'Estado o entidad federativa',
    example: 'Oaxaca',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  estado?: string;

  @ApiProperty({
    description: 'País fiscal',
    example: 'México',
    default: 'México',
    required: false,
  })
  @Column({ type: 'varchar', length: 60, default: 'México', nullable: true })
  pais?: string;

  @ApiProperty({
    description: 'Código postal del domicilio fiscal (5 dígitos)',
    example: '68050',
    required: false,
  })
  @Column({ type: 'varchar', length: 10, nullable: true })
  codigoPostal?: string;

  @ApiProperty({
    description: 'Número de teléfono de contacto',
    example: '9511234567',
    required: false,
  })
  @Column({ type: 'varchar', length: 25, nullable: true })
  telefono?: string;

  @ApiProperty({
    description: 'Correo electrónico para facturas y notificaciones',
    example: 'facturacion@elroble.com',
    required: false,
  })
  @Column({ type: 'varchar', length: 120, nullable: true })
  email?: string;

  @ApiProperty({
    description: 'Referencias adicionales de ubicación o notas de entrega',
    example: 'Entre calle Rosas y Claveles, portón color verde',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  referencia?: string;

  // ---------------------------------------------------------------------------
  // Relación con Finanzas/Ingresos (1 cliente -> N ingresos/servicios)
  // ---------------------------------------------------------------------------
  @ApiProperty({
    description: 'Historial de ingresos/servicios asociados al cliente',
    type: () => [Incomes],
    required: false,
  })
  @OneToMany(() => Incomes, (income) => income.cliente)
  ingresos: Relation<Incomes[]>;

  @ApiProperty({ description: 'Fecha de registro del cliente' })
  @CreateDateColumn()
  createdAt: Date;
}
