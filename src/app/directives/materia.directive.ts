import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.service';

@Directive({
  selector: '[appMateriaDirectiva]',
  standalone: true
})
export class MateriaDirectiva implements OnInit {
  @Input() idMateria!: string;

  constructor(
    private materiaService: MateriaService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.idMateria) {
      this.materiaService.getById(this.idMateria).subscribe({
        next: (materia) => {
          this.renderer.setProperty(this.el.nativeElement, 'innerText', materia.nombre);
        },
        error: (err) => {
          console.error('Error fetching materia', err);
        }
      });
    }
  }
}
