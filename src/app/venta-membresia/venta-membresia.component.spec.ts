import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMembresiaComponent } from './venta-membresia.component';

describe('VentaMembresiaComponent', () => {
  let component: VentaMembresiaComponent;
  let fixture: ComponentFixture<VentaMembresiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaMembresiaComponent]
    });
    fixture = TestBed.createComponent(VentaMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

