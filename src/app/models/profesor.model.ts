import { Clase } from './clase.model';

export interface Profesor {
  id: string;
  nombre: string;
  clases: Clase[];
}
