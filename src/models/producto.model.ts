import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProductoInventario} from './producto-inventario.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigoProducto: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreProducto: string;

  @property({
    type: 'string',
  })
  descripcionProducto?: string;

  @property({
    type: 'number',
    required: true,
  })
  costoProduccion: number;

  @property({
    type: 'number',
    required: true,
  })
  valorVenta: number;

  @belongsTo(() => ProductoInventario, {name: 'ProdutoProductoInventario'})
  productoInventarioId: string;
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
