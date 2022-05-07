import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Empleados} from './empleados.model';
import {Inventario} from './inventario.model';

@model()
export class Sucursal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoSucursal: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreSucursal: string;

  @property({
    type: 'string',
    required: true,
  })
  direccionSucursal: string;

  @hasMany(() => Empleados)
  SucursalEmpleados: Empleados[];

  @property({
    type: 'string',
  })
  inventarioId?: string;

  @hasOne(() => Inventario)
  SucursalInventario: Inventario;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
