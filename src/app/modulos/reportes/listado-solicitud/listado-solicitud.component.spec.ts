import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSolicitudComponent } from './listado-solicitud.component';

describe('ListadoSolicitudComponent', () => {
  let component: ListadoSolicitudComponent;
  let fixture: ComponentFixture<ListadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
