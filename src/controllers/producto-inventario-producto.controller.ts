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
  Producto,
} from '../models';
import {ProductoInventarioRepository} from '../repositories';

export class ProductoInventarioProductoController {
  constructor(
    @repository(ProductoInventarioRepository) protected productoInventarioRepository: ProductoInventarioRepository,
  ) { }

  @get('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of ProductoInventario has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.productoInventarioRepository.ProductoInventarioProducto(id).find(filter);
  }

  @post('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoInventario.prototype.codigoProducto_Inventario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInProductoInventario',
            exclude: ['codigoProducto'],
            optional: ['productoInventarioId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigoProducto'>,
  ): Promise<Producto> {
    return this.productoInventarioRepository.ProductoInventarioProducto(id).create(producto);
  }

  @patch('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoInventarioRepository.ProductoInventarioProducto(id).patch(producto, where);
  }

  @del('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoInventarioRepository.ProductoInventarioProducto(id).delete(where);
  }
}
