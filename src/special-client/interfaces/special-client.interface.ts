import { FormaPago, MetodoPago, RegimenFiscal, UsoCfdi } from '../enums/special-client.enum.js';

export interface ISpecialClient {
  nombreEmpresa: string;
  direccion?: string;
  requiereFactura: boolean;
  activo: boolean;

  // Campos de facturación
  rfc?: string;
  razonSocial?: string;
  regimenFiscal?: RegimenFiscal;
  usoCfdi?: UsoCfdi;
  metodoPago?: MetodoPago;
  formaPago?: FormaPago;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  colonia?: string;
  municipio?: string;
  ciudad?: string;
  estado?: string;
  pais?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  referencia?: string;
}
