export enum MetodoPago {
  PUE = 'PUE', // Pago en una sola exhibición
  PPD = 'PPD', // Pago en parcialidades o diferido
}

export enum FormaPago {
  EFECTIVO = '01',
  CHEQUE = '02',
  TRANSFERENCIA = '03',
  TARJETA_CREDITO = '04',
  MONEDERO_ELECTRONICO = '05',
  DINERO_ELECTRONICO = '06',
  VALES_DESPENSA = '08',
  DACION_PAGO = '12',
  CONDONACION = '15',
  COMPENSACION = '17',
  TARJETA_DEBITO = '28',
  TARJETA_SERVICIOS = '29',
  INTERMEDIARIO_PAGOS = '31',
  POR_DEFINIR = '99',
}

export enum UsoCfdi {
  G01 = 'G01', // Adquisición de mercancías
  G02 = 'G02', // Devoluciones, descuentos o bonificaciones
  G03 = 'G03', // Gastos en general
  I01 = 'I01', // Construcciones
  I02 = 'I02', // Mobiliario y equipo de oficina
  I03 = 'I03', // Equipo de transporte
  I04 = 'I04', // Equipo de cómputo y accesorios
  I08 = 'I08', // Otra maquinaria y equipo
  D01 = 'D01', // Honorarios médicos, dentales y gastos hospitalarios
  D02 = 'D02', // Gastos médicos por incapacidad o discapacidad
  D03 = 'D03', // Gastos funerales
  D04 = 'D04', // Donativos
  D07 = 'D07', // Primas por seguros de gastos médicos
  D10 = 'D10', // Pagos por servicios educativos (colegiaturas)
  S01 = 'S01', // Sin efectos fiscales
  CP01 = 'CP01', // Pagos
  CN01 = 'CN01', // Nómina
}

export enum RegimenFiscal {
  REG_601 = '601', // General de Ley Personas Morales
  REG_603 = '603', // Personas Morales con Fines no Lucrativos
  REG_605 = '605', // Sueldos y Salarios e Ingresos Asimilados a Salarios
  REG_606 = '606', // Arrendamiento
  REG_607 = '607', // Régimen de Enajenación o Adquisición de Bienes
  REG_608 = '608', // Demás ingresos
  REG_610 = '610', // Residentes en el Extranjero sin Establecimiento Permanente en México
  REG_611 = '611', // Ingresos por Dividendos (socios y accionistas)
  REG_612 = '612', // Personas Físicas con Actividades Empresariales y Profesionales
  REG_614 = '614', // Ingresos por intereses
  REG_615 = '615', // Régimen de los ingresos por obtención de premios
  REG_616 = '616', // Sin obligaciones fiscales
  REG_620 = '620', // Sociedades Cooperativas de Producción que optan por diferir sus ingresos
  REG_621 = '621', // Incorporación Fiscal
  REG_622 = '622', // Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras
  REG_623 = '623', // Opcional para Grupos de Sociedades
  REG_624 = '624', // Coordinados
  REG_625 = '625', // Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas
  REG_626 = '626', // Régimen Simplificado de Confianza (RESICO)
}
