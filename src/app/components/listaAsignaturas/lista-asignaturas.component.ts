import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { ProgramaAcademicoDto } from '../../models/programa-academico-dto.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { Clase } from '../../models/clase.model';
import { ClaseService } from '../../services/clase.service';
import { MateriaDirectiva } from '../../directives/materia.directive';
import { EstudianteDirectiva } from '../../directives/estudiante.directive';

@Component({
  selector: 'app-lista-asignaturas',
  standalone: true,
  templateUrl: './lista-asignaturas.component.html',
  imports: [AsyncPipe, MateriaDirectiva, EstudianteDirectiva],
  styleUrls: ['./lista-asignaturas.component.css']
})
export class ListaAsignaturasComponent {

  userId = signal<string | null>(null);
  items$: Observable<Clase[]> | undefined;
  programs$: Observable<ProgramaAcademicoDto[]> | undefined;
  showPopup = signal(false);
  selectedItem = signal<Clase | null>(null);

  constructor(public authService: AuthService, public programaAcademicoService: ProgramaAcademicoService, public claseService: ClaseService) { }


  ngOnInit() {
    this.userId.set(sessionStorage.getItem('user_id'));
    this.items$ = this.claseService.getByEstudianteId(sessionStorage.getItem('user_id')!)
  }

  detail(item: Clase) {
    this.programs$ = this.programaAcademicoService.getByClaseId(item.id);
    this.selectedItem.set(item);
    this.showPopup.set(true);
    console.log(item);

  }

  closePopup() {
    this.showPopup.set(false);
    this.selectedItem.set(null);
  }

}
