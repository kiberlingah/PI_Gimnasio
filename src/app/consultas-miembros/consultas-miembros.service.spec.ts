import { TestBed } from '@angular/core/testing';

import { ConsultasMiembrosService } from './consultas-miembros.service';


describe('ConsultasMiembrosService', () => {
  let service: ConsultasMiembrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasMiembrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});




