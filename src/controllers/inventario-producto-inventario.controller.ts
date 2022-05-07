import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inventario,
  ProductoInventario,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioProductoInventarioController {
  constructor(
    @repository(InventarioRepository)
    public inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/producto-inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario belonging to Inventario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoInventario)},
          },
        },
      },
    },
  })
  async getProductoInventario(
    @param.path.string('id') id: typeof Inventario.prototype.codigoInventario,
  ): Promise<ProductoInventario> {
    return this.inventarioRepository.InventarioProductoInventario(id);
  }
}
