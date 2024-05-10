export class VentaMembresia {
  membresiaId?: number;
  fechaInicio?: string;
  fechaVencimiento?: string;
  estado?: number;
  miembros?: { miembroId: number };
  planes?: { planesId: number };
  usuarios?: { usuarioId: number };
  pagos?: Pago[];
}

export class Pago {
  fechaPago?: string;
  monto?: number;
  metodoPago?: number;
}
