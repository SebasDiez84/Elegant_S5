import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Producto, ProductoRelations, ProductoInventario} from '../models';
import {ProductoInventarioRepository} from './producto-inventario.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.codigoProducto,
  ProductoRelations
> {

  public readonly ProdutoProductoInventario: BelongsToAccessor<ProductoInventario, typeof Producto.prototype.codigoProducto>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('ProductoInventarioRepository') protected productoInventarioRepositoryGetter: Getter<ProductoInventarioRepository>,
  ) {
    super(Producto, dataSource);
    this.ProdutoProductoInventario = this.createBelongsToAccessorFor('ProdutoProductoInventario', productoInventarioRepositoryGetter,);
    this.registerInclusionResolver('ProdutoProductoInventario', this.ProdutoProductoInventario.inclusionResolver);
  }
}
