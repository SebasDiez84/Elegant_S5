import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Producto, ProductoRelations, ProductoInventario, Disennos} from '../models';
import {ProductoInventarioRepository} from './producto-inventario.repository';
import {DisennosRepository} from './disennos.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.codigoProducto,
  ProductoRelations
> {

  public readonly ProdutoProductoInventario: BelongsToAccessor<ProductoInventario, typeof Producto.prototype.codigoProducto>;

  public readonly disennoDeProducto: BelongsToAccessor<Disennos, typeof Producto.prototype.codigoProducto>;

  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource, @repository.getter('ProductoInventarioRepository') protected productoInventarioRepositoryGetter: Getter<ProductoInventarioRepository>, @repository.getter('DisennosRepository') protected disennosRepositoryGetter: Getter<DisennosRepository>,
  ) {
    super(Producto, dataSource);
    this.disennoDeProducto = this.createBelongsToAccessorFor('disennoDeProducto', disennosRepositoryGetter,);
    this.registerInclusionResolver('disennoDeProducto', this.disennoDeProducto.inclusionResolver);
    this.ProdutoProductoInventario = this.createBelongsToAccessorFor('ProdutoProductoInventario', productoInventarioRepositoryGetter,);
    this.registerInclusionResolver('ProdutoProductoInventario', this.ProdutoProductoInventario.inclusionResolver);
  }
}
