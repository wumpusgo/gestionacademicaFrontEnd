import { Clase } from './clase.model';
import { Estudiante } from './estudiante.model';

export interface ProgramaAcademicoDto {
  id: string;
  idClase: string;
  idEstudiante: string;
  clase: Clase;
  estudiante: Estudiante;
}
