import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';

@Directive({
  selector: '[appEstudianteDirectiva]',
  standalone: true
})
export class EstudianteDirectiva implements OnInit {
  @Input() idEstudiante!: string;

  constructor(
    private estudianteService: EstudianteService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.idEstudiante) {
      this.estudianteService.getById(this.idEstudiante).subscribe({
        next: (estudiante) => {
          this.renderer.setProperty(this.el.nativeElement, 'innerText', estudiante.nombre);
        },
        error: (err) => {
          console.error('Error fetching estudiante', err);
        }
      });
    }
  }
}
