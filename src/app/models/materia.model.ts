import { Clase } from './clase.model';

export interface Materia {
  id: string;
  nombre: string;
  creditos: number;
  clases: Clase[];
}
