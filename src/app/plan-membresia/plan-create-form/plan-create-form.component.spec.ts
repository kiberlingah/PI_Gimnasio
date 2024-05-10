import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCreateFormComponent } from './plan-create-form.component';

describe('PlanCreateFormComponent', () => {
  let component: PlanCreateFormComponent;
  let fixture: ComponentFixture<PlanCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanCreateFormComponent]
    });
    fixture = TestBed.createComponent(PlanCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
