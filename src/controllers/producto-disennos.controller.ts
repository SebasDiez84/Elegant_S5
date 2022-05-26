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
  Disennos,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDisennosController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/disennos', {
    responses: {
      '200': {
        description: 'Disennos belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Disennos)},
          },
        },
      },
    },
  })
  async getDisennos(
    @param.path.string('id') id: typeof Producto.prototype.codigoProducto,
  ): Promise<Disennos> {
    return this.productoRepository.disennoDeProducto(id);
  }
}
