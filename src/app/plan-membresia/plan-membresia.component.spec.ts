import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMembresiaComponent } from './plan-membresia.component';

describe('PlanMembresiaComponent', () => {
  let component: PlanMembresiaComponent;
  let fixture: ComponentFixture<PlanMembresiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanMembresiaComponent]
    });
    fixture = TestBed.createComponent(PlanMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
