import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  FormaPago,
  MetodoPago,
  RegimenFiscal,
  UsoCfdi,
} from '../enums/special-client.enum.js';
import { ISpecialClient } from '../interfaces/special-client.interface.js';

export class CreateSpecialClientDto implements ISpecialClient {
  @ApiProperty({
    description: 'Nombre comercial o nombre de la empresa',
    example: 'Constructora El Roble S.A. de C.V.',
  })
  @IsString({ message: 'El nombre de la empresa debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio' })
  nombreEmpresa: string;

  @ApiProperty({
    description: 'Dirección física general o de entrega',
    example: 'Av. Las Palmas #123, Col. Reforma, Oaxaca',
    required: false,
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({
    description: '¿El cliente requiere emisión de factura fiscal?',
    example: true,
    default: false,
  })
  @IsBoolean({ message: 'requiereFactura debe ser un valor booleano' })
  @IsOptional()
  requiereFactura: boolean = false;

  @ApiProperty({
    description: '¿El cliente se encuentra activo en el sistema?',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'activo debe ser un valor booleano' })
  @IsOptional()
  activo: boolean = true;

  // ---------------------------------------------------------------------------
  // Campos de Facturación (SAT CFDI 4.0)
  // ---------------------------------------------------------------------------

  @ApiProperty({
    description: 'RFC fiscal (12 o 13 caracteres)',
    example: 'XAXX010101000',
    required: false,
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  rfc?: string;

  @ApiProperty({
    description: 'Nombre o Razón Social registrada ante el SAT',
    example: 'CONSTRUCTORA EL ROBLE SA DE CV',
    required: false,
  })
  @IsString()
  @IsOptional()
  razonSocial?: string;

  @ApiProperty({
    description: 'Clave del Régimen Fiscal según catálogo SAT CFDI 4.0',
    enum: RegimenFiscal,
    example: RegimenFiscal.REG_601,
    required: false,
  })
  @IsEnum(RegimenFiscal, { message: 'El régimen fiscal seleccionado no es válido' })
  @IsOptional()
  regimenFiscal?: RegimenFiscal;

  @ApiProperty({
    description: 'Clave de Uso del CFDI según catálogo SAT CFDI 4.0',
    enum: UsoCfdi,
    example: UsoCfdi.G03,
    required: false,
  })
  @IsEnum(UsoCfdi, { message: 'El uso del CFDI seleccionado no es válido' })
  @IsOptional()
  usoCfdi?: UsoCfdi;

  @ApiProperty({
    description: 'Método de pago (PUE o PPD)',
    enum: MetodoPago,
    example: MetodoPago.PUE,
    required: false,
  })
  @IsEnum(MetodoPago, { message: 'El método de pago debe ser PUE o PPD' })
  @IsOptional()
  metodoPago?: MetodoPago;

  @ApiProperty({
    description: 'Clave de forma de pago según catálogo SAT',
    enum: FormaPago,
    example: FormaPago.TRANSFERENCIA,
    required: false,
  })
  @IsEnum(FormaPago, { message: 'La forma de pago seleccionada no es válida' })
  @IsOptional()
  formaPago?: FormaPago;

  @ApiProperty({
    description: 'Calle fiscal',
    example: 'Av. Las Palmas',
    required: false,
  })
  @IsString()
  @IsOptional()
  calle?: string;

  @ApiProperty({
    description: 'Número exterior fiscal',
    example: '123',
    required: false,
  })
  @IsString()
  @IsOptional()
  numeroExterior?: string;

  @ApiProperty({
    description: 'Número interior fiscal',
    example: 'Piso 2, Int. B',
    required: false,
  })
  @IsString()
  @IsOptional()
  numeroInterior?: string;

  @ApiProperty({
    description: 'Colonia fiscal',
    example: 'Reforma',
    required: false,
  })
  @IsString()
  @IsOptional()
  colonia?: string;

  @ApiProperty({
    description: 'Municipio o delegación fiscal',
    example: 'Oaxaca de Juárez',
    required: false,
  })
  @IsString()
  @IsOptional()
  municipio?: string;

  @ApiProperty({
    description: 'Ciudad o localidad fiscal',
    example: 'Oaxaca',
    required: false,
  })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiProperty({
    description: 'Estado fiscal',
    example: 'Oaxaca',
    required: false,
  })
  @IsString()
  @IsOptional()
  estado?: string;

  @ApiProperty({
    description: 'País fiscal',
    example: 'México',
    default: 'México',
    required: false,
  })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiProperty({
    description: 'Código postal (5 dígitos)',
    example: '68050',
    required: false,
  })
  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '9511234567',
    required: false,
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({
    description: 'Correo electrónico fiscal',
    example: 'facturacion@elroble.com',
    required: false,
  })
  @IsEmail({}, { message: 'El formato del correo electrónico es inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Referencias adicionales o notas de ubicación',
    example: 'Frente al parque central, portón verde',
    required: false,
  })
  @IsString()
  @IsOptional()
  referencia?: string;
}
