import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';

@Directive({
  selector: '[appProfesorDirectiva]',
  standalone: true
})
export class ProfesorDirectiva implements OnInit {
  @Input() idProfesor!: string;

  constructor(
    private profesorService: ProfesorService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.idProfesor) {
      this.profesorService.getById(this.idProfesor).subscribe({
        next: (profesor) => {
          this.renderer.setProperty(this.el.nativeElement, 'innerText', profesor.nombre);
        },
        error: (err) => {
          console.error('Error fetching profesor', err);
        }
      });
    }
  }
}
