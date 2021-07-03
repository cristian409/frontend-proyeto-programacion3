import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPagosComponent } from './crear-pagos.component';

describe('CrearPagosComponent', () => {
  let component: CrearPagosComponent;
  let fixture: ComponentFixture<CrearPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
