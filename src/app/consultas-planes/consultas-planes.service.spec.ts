import { TestBed } from '@angular/core/testing';

import { ConsultasPlanesService } from './consultas-planes.service';


describe('ConsultasPlanesService', () => {
  let service: ConsultasPlanesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasPlanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});