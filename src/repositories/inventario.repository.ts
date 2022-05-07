import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Inventario, InventarioRelations, ProductoInventario, Sucursal} from '../models';
import {ProductoInventarioRepository} from './producto-inventario.repository';
import {SucursalRepository} from './sucursal.repository';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype.codigoInventario,
  InventarioRelations
> {

  public readonly InventarioProductoInventario: BelongsToAccessor<ProductoInventario, typeof Inventario.prototype.codigoInventario>;

  public readonly InventarioSucursal: HasOneRepositoryFactory<Sucursal, typeof Inventario.prototype.codigoInventario>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('ProductoInventarioRepository') protected productoInventarioRepositoryGetter: Getter<ProductoInventarioRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Inventario, dataSource);
    this.InventarioSucursal = this.createHasOneRepositoryFactoryFor('InventarioSucursal', sucursalRepositoryGetter);
    this.registerInclusionResolver('InventarioSucursal', this.InventarioSucursal.inclusionResolver);
    this.InventarioProductoInventario = this.createBelongsToAccessorFor('InventarioProductoInventario', productoInventarioRepositoryGetter,);
    this.registerInclusionResolver('InventarioProductoInventario', this.InventarioProductoInventario.inclusionResolver);
  }
}
