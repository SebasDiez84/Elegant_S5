import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Sucursal} from './sucursal.model';

@model()
export class Empleados extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoEmpleado: string;

  @property({
    type: 'string',
    required: true,
  })
  cedulaEmpleado: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreEmpleado: string;

  @belongsTo(() => Sucursal, {name: 'EmpleadoSucursal'})
  CodigoSucursal: string;

  @property({
    type: 'string',
  })
  sucursalId?: string;

  constructor(data?: Partial<Empleados>) {
    super(data);
  }
}

export interface EmpleadosRelations {
  // describe navigational properties here
}

export type EmpleadosWithRelations = Empleados & EmpleadosRelations;
