import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Empleados, Inventario} from '../models';
import {EmpleadosRepository} from './empleados.repository';
import {InventarioRepository} from './inventario.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.codigoSucursal,
  SucursalRelations
> {

  public readonly SucursalEmpleados: HasManyRepositoryFactory<Empleados, typeof Sucursal.prototype.codigoSucursal>;

  public readonly SucursalInventario: HasOneRepositoryFactory<Inventario, typeof Sucursal.prototype.codigoSucursal>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('EmpleadosRepository') protected empleadosRepositoryGetter: Getter<EmpleadosRepository>, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Sucursal, dataSource);
    this.SucursalInventario = this.createHasOneRepositoryFactoryFor('SucursalInventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('SucursalInventario', this.SucursalInventario.inclusionResolver);
    this.SucursalEmpleados = this.createHasManyRepositoryFactoryFor('SucursalEmpleados', empleadosRepositoryGetter,);
    this.registerInclusionResolver('SucursalEmpleados', this.SucursalEmpleados.inclusionResolver);
  }
}
