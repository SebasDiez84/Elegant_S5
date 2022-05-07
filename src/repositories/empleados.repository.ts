import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Empleados, EmpleadosRelations, Sucursal} from '../models';
import {SucursalRepository} from './sucursal.repository';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.codigoEmpleado,
  EmpleadosRelations
> {

  public readonly EmpleadoSucursal: BelongsToAccessor<Sucursal, typeof Empleados.prototype.codigoEmpleado>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Empleados, dataSource);
    this.EmpleadoSucursal = this.createBelongsToAccessorFor('EmpleadoSucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('EmpleadoSucursal', this.EmpleadoSucursal.inclusionResolver);
  }
}
