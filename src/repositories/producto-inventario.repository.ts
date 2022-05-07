import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {ProductoInventario, ProductoInventarioRelations, Producto, Inventario} from '../models';
import {ProductoRepository} from './producto.repository';
import {InventarioRepository} from './inventario.repository';

export class ProductoInventarioRepository extends DefaultCrudRepository<
  ProductoInventario,
  typeof ProductoInventario.prototype.codigoProducto_Inventario,
  ProductoInventarioRelations
> {

  public readonly ProductoInventarioProducto: HasManyRepositoryFactory<Producto, typeof ProductoInventario.prototype.codigoProducto_Inventario>;

  public readonly ProductoInventarioInventario: HasOneRepositoryFactory<Inventario, typeof ProductoInventario.prototype.codigoProducto_Inventario>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(ProductoInventario, dataSource);
    this.ProductoInventarioInventario = this.createHasOneRepositoryFactoryFor('ProductoInventarioInventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('ProductoInventarioInventario', this.ProductoInventarioInventario.inclusionResolver);
    this.ProductoInventarioProducto = this.createHasManyRepositoryFactoryFor('ProductoInventarioProducto', productoRepositoryGetter,);
    this.registerInclusionResolver('ProductoInventarioProducto', this.ProductoInventarioProducto.inclusionResolver);
  }
}
