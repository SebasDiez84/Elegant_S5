import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductoInventario} from '../models';
import {ProductoInventarioRepository} from '../repositories';

export class ProductoInventarioController {
  constructor(
    @repository(ProductoInventarioRepository)
    public productoInventarioRepository : ProductoInventarioRepository,
  ) {}

  @post('/producto-inventarios')
  @response(200, {
    description: 'ProductoInventario model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoInventario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoInventario, {
            title: 'NewProductoInventario',
            exclude: ['codigoProducto_Inventario'],
          }),
        },
      },
    })
    productoInventario: Omit<ProductoInventario, 'codigoProducto_Inventario'>,
  ): Promise<ProductoInventario> {
    return this.productoInventarioRepository.create(productoInventario);
  }

  @get('/producto-inventarios/count')
  @response(200, {
    description: 'ProductoInventario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoInventario) where?: Where<ProductoInventario>,
  ): Promise<Count> {
    return this.productoInventarioRepository.count(where);
  }

  @get('/producto-inventarios')
  @response(200, {
    description: 'Array of ProductoInventario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoInventario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoInventario) filter?: Filter<ProductoInventario>,
  ): Promise<ProductoInventario[]> {
    return this.productoInventarioRepository.find(filter);
  }

  @patch('/producto-inventarios')
  @response(200, {
    description: 'ProductoInventario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoInventario, {partial: true}),
        },
      },
    })
    productoInventario: ProductoInventario,
    @param.where(ProductoInventario) where?: Where<ProductoInventario>,
  ): Promise<Count> {
    return this.productoInventarioRepository.updateAll(productoInventario, where);
  }

  @get('/producto-inventarios/{id}')
  @response(200, {
    description: 'ProductoInventario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoInventario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductoInventario, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoInventario>
  ): Promise<ProductoInventario> {
    return this.productoInventarioRepository.findById(id, filter);
  }

  @patch('/producto-inventarios/{id}')
  @response(204, {
    description: 'ProductoInventario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoInventario, {partial: true}),
        },
      },
    })
    productoInventario: ProductoInventario,
  ): Promise<void> {
    await this.productoInventarioRepository.updateById(id, productoInventario);
  }

  @put('/producto-inventarios/{id}')
  @response(204, {
    description: 'ProductoInventario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productoInventario: ProductoInventario,
  ): Promise<void> {
    await this.productoInventarioRepository.replaceById(id, productoInventario);
  }

  @del('/producto-inventarios/{id}')
  @response(204, {
    description: 'ProductoInventario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productoInventarioRepository.deleteById(id);
  }
}
