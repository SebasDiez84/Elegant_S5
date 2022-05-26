import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Disennos, DisennosRelations} from '../models';

export class DisennosRepository extends DefaultCrudRepository<
  Disennos,
  typeof Disennos.prototype.codigo_disenno,
  DisennosRelations
> {
  constructor(
    @inject('datasources.postgresqlDS') dataSource: PostgresqlDsDataSource,
  ) {
    super(Disennos, dataSource);
  }
}
