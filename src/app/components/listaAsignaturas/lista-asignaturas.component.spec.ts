import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAsignaturasComponent } from './lista-asignaturas.component';

describe('ListaAsignaturasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAsignaturasComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListaAsignaturasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
