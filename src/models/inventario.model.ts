import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {ProductoInventario} from './producto-inventario.model';
import {Sucursal} from './sucursal.model';

@model()
export class Inventario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoInventario: string;

  @belongsTo(() => ProductoInventario, {name: 'InventarioProductoInventario'})
  productoInventarioId: string;

  @hasOne(() => Sucursal)
  InventarioSucursal: Sucursal;

  @property({
    type: 'string',
  })
  sucursalId?: string;

  constructor(data?: Partial<Inventario>) {
    super(data);
  }
}

export interface InventarioRelations {
  // describe navigational properties here
}

export type InventarioWithRelations = Inventario & InventarioRelations;
