import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanUpdateFormComponent } from './plan-update-form.component';

describe('PlanUpdateFormComponent', () => {
  let component: PlanUpdateFormComponent;
  let fixture: ComponentFixture<PlanUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanUpdateFormComponent]
    });
    fixture = TestBed.createComponent(PlanUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
