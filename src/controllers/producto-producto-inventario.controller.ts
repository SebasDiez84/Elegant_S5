import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  ProductoInventario,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProductoInventarioController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/producto-inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoInventario)},
          },
        },
      },
    },
  })
  async getProductoInventario(
    @param.path.string('id') id: typeof Producto.prototype.codigoProducto,
  ): Promise<ProductoInventario> {
    return this.productoRepository.ProdutoProductoInventario(id);
  }
}
