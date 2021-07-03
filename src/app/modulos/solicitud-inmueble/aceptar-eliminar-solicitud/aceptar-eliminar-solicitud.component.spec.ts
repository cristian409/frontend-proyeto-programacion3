import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarEliminarSolicitudComponent } from './aceptar-eliminar-solicitud.component';

describe('AceptarEliminarSolicitudComponent', () => {
  let component: AceptarEliminarSolicitudComponent;
  let fixture: ComponentFixture<AceptarEliminarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptarEliminarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarEliminarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
