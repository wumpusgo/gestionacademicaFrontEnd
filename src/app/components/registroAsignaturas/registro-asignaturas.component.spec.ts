import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAsignaturasComponent } from './registro-asignaturas.component';

describe('RegistroAsignaturasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAsignaturasComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegistroAsignaturasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
