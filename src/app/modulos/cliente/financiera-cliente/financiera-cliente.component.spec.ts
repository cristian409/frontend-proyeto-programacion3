import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieraClienteComponent } from './financiera-cliente.component';

describe('FinancieraClienteComponent', () => {
  let component: FinancieraClienteComponent;
  let fixture: ComponentFixture<FinancieraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancieraClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
