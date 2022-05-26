import {Entity, model, property} from '@loopback/repository';

@model()
export class Disennos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigo_disenno: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_disenno: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_disenno: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_disenno: string;

  @property({
    type: 'string',
    required: true,
  })
  temporada_disenno: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_desennador: string;


  constructor(data?: Partial<Disennos>) {
    super(data);
  }
}

export interface DisennosRelations {
  // describe navigational properties here
}

export type DisennosWithRelations = Disennos & DisennosRelations;
