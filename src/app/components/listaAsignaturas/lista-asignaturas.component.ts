import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { ProgramaAcademicoDto } from '../../models/programa-academico-dto.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lista-asignaturas',
  standalone: true,
  templateUrl: './lista-asignaturas.component.html',
  imports: [AsyncPipe],
  styleUrls: ['./lista-asignaturas.component.css']
})
export class ListaAsignaturasComponent {

  userId = signal<string | null>(null);
  items$: Observable<ProgramaAcademicoDto[]> | undefined;
  constructor(public authService: AuthService, public programaAcademicoService: ProgramaAcademicoService) { }


  ngOnInit() {
    this.userId.set(sessionStorage.getItem('user_id'));
    this.items$ = this.programaAcademicoService.getByEstudianteId(this.userId()!);
  }


}
