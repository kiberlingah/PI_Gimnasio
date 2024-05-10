import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroComponent } from './miembro.component';

describe('MiembroComponent', () => {
  let component: MiembroComponent;
  let fixture: ComponentFixture<MiembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiembroComponent]
    });
    fixture = TestBed.createComponent(MiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
