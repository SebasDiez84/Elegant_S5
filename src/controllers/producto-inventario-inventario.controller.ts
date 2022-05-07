import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProductoInventario,
  Inventario,
} from '../models';
import {ProductoInventarioRepository} from '../repositories';

export class ProductoInventarioInventarioController {
  constructor(
    @repository(ProductoInventarioRepository) protected productoInventarioRepository: ProductoInventarioRepository,
  ) { }

  @get('/producto-inventarios/{id}/inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario has one Inventario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inventario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario> {
    return this.productoInventarioRepository.ProductoInventarioInventario(id).get(filter);
  }

  @post('/producto-inventarios/{id}/inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoInventario.prototype.codigoProducto_Inventario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInProductoInventario',
            exclude: ['codigoInventario'],
            optional: ['productoInventarioId']
          }),
        },
      },
    }) inventario: Omit<Inventario, 'codigoInventario'>,
  ): Promise<Inventario> {
    return this.productoInventarioRepository.ProductoInventarioInventario(id).create(inventario);
  }

  @patch('/producto-inventarios/{id}/inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario.Inventario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {partial: true}),
        },
      },
    })
    inventario: Partial<Inventario>,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.productoInventarioRepository.ProductoInventarioInventario(id).patch(inventario, where);
  }

  @del('/producto-inventarios/{id}/inventario', {
    responses: {
      '200': {
        description: 'ProductoInventario.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.productoInventarioRepository.ProductoInventarioInventario(id).delete(where);
  }
}
