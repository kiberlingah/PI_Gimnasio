import { TestBed } from '@angular/core/testing';

import { PlanMembresiaService } from './plan-membresia.service';

describe('PlanMembresiaService', () => {
  let service: PlanMembresiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMembresiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
