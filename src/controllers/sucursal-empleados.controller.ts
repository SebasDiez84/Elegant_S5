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
  Sucursal,
  Empleados,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalEmpleadosController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Empleados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleados)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleados>,
  ): Promise<Empleados[]> {
    return this.sucursalRepository.SucursalEmpleados(id).find(filter);
  }

  @post('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleados)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.codigoSucursal,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {
            title: 'NewEmpleadosInSucursal',
            exclude: ['codigoEmpleado'],
            optional: ['sucursalId']
          }),
        },
      },
    }) empleados: Omit<Empleados, 'codigoEmpleado'>,
  ): Promise<Empleados> {
    return this.sucursalRepository.SucursalEmpleados(id).create(empleados);
  }

  @patch('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal.Empleados PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleados, {partial: true}),
        },
      },
    })
    empleados: Partial<Empleados>,
    @param.query.object('where', getWhereSchemaFor(Empleados)) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.sucursalRepository.SucursalEmpleados(id).patch(empleados, where);
  }

  @del('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal.Empleados DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleados)) where?: Where<Empleados>,
  ): Promise<Count> {
    return this.sucursalRepository.SucursalEmpleados(id).delete(where);
  }
}
