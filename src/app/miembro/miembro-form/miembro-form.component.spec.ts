import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroFormComponent } from './miembro-form.component';

describe('MiembroFormComponent', () => {
  let component: MiembroFormComponent;
  let fixture: ComponentFixture<MiembroFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiembroFormComponent]
    });
    fixture = TestBed.createComponent(MiembroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
