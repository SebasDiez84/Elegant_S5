import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Disennos} from '../models';
import {DisennosRepository} from '../repositories';

export class DisennoController {
  constructor(
    @repository(DisennosRepository)
    public disennosRepository : DisennosRepository,
  ) {}

  @post('/disennos')
  @response(200, {
    description: 'Disennos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Disennos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disennos, {
            title: 'NewDisennos',
            
          }),
        },
      },
    })
    disennos: Disennos,
  ): Promise<Disennos> {
    return this.disennosRepository.create(disennos);
  }

  @get('/disennos/count')
  @response(200, {
    description: 'Disennos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Disennos) where?: Where<Disennos>,
  ): Promise<Count> {
    return this.disennosRepository.count(where);
  }

  @get('/disennos')
  @response(200, {
    description: 'Array of Disennos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Disennos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Disennos) filter?: Filter<Disennos>,
  ): Promise<Disennos[]> {
    return this.disennosRepository.find(filter);
  }

  @patch('/disennos')
  @response(200, {
    description: 'Disennos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disennos, {partial: true}),
        },
      },
    })
    disennos: Disennos,
    @param.where(Disennos) where?: Where<Disennos>,
  ): Promise<Count> {
    return this.disennosRepository.updateAll(disennos, where);
  }

  @get('/disennos/{id}')
  @response(200, {
    description: 'Disennos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Disennos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Disennos, {exclude: 'where'}) filter?: FilterExcludingWhere<Disennos>
  ): Promise<Disennos> {
    return this.disennosRepository.findById(id, filter);
  }

  @patch('/disennos/{id}')
  @response(204, {
    description: 'Disennos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disennos, {partial: true}),
        },
      },
    })
    disennos: Disennos,
  ): Promise<void> {
    await this.disennosRepository.updateById(id, disennos);
  }

  @put('/disennos/{id}')
  @response(204, {
    description: 'Disennos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() disennos: Disennos,
  ): Promise<void> {
    await this.disennosRepository.replaceById(id, disennos);
  }

  @del('/disennos/{id}')
  @response(204, {
    description: 'Disennos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.disennosRepository.deleteById(id);
  }
}
