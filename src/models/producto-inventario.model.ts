import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<ProductoInventario>) {
    super(data);
  }
}

export interface ProductoInventarioRelations {
  // describe navigational properties here
}

export type ProductoInventarioWithRelations = ProductoInventario & ProductoInventarioRelations;
