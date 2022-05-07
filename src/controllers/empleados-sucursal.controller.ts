import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleados,
  Sucursal,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosSucursalController {
  constructor(
    @repository(EmpleadosRepository)
    public empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Empleados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Empleados.prototype.codigoEmpleado,
  ): Promise<Sucursal> {
    return this.empleadosRepository.EmpleadoSucursal(id);
  }
}
