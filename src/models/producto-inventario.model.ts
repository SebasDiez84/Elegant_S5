import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Producto} from './producto.model';
import {Inventario} from './inventario.model';

@model()
export class ProductoInventario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoProducto_Inventario: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @hasMany(() => Producto)
  ProductoInventarioProducto: Producto[];

  @hasOne(() => Inventario)
  ProductoInventarioInventario: Inventario;
}

export interface ProductoInventarioRelations {
  // describe navigational properties here
}

export type ProductoInventarioWithRelations = ProductoInventario & ProductoInventarioRelations;
