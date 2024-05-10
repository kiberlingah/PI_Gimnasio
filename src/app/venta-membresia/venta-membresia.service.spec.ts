import { TestBed } from '@angular/core/testing';

import { VentaMembresiaService } from './venta-membresia.service';

describe('VentaMembresiaService', () => {
  let service: VentaMembresiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaMembresiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
