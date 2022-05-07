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
  Inventario,
  Sucursal,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioSucursalController {
  constructor(
    @repository(InventarioRepository) protected inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Inventario has one Sucursal',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sucursal),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal> {
    return this.inventarioRepository.InventarioSucursal(id).get(filter);
  }

  @post('/inventarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Inventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventario.prototype.codigoInventario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInInventario',
            exclude: ['codigoSucursal'],
            optional: ['inventarioId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'codigoSucursal'>,
  ): Promise<Sucursal> {
    return this.inventarioRepository.InventarioSucursal(id).create(sucursal);
  }

  @patch('/inventarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Inventario.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.inventarioRepository.InventarioSucursal(id).patch(sucursal, where);
  }

  @del('/inventarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Inventario.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.inventarioRepository.InventarioSucursal(id).delete(where);
  }
}
