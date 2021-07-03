import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPagosComponent } from './eliminar-pagos.component';

describe('EliminarPagosComponent', () => {
  let component: EliminarPagosComponent;
  let fixture: ComponentFixture<EliminarPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
