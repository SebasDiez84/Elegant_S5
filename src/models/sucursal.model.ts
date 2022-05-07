import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
