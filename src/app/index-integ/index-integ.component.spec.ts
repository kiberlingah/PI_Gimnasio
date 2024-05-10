import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIntegComponent } from './index-integ.component';

describe('IndexIntegComponent', () => {
  let component: IndexIntegComponent;
  let fixture: ComponentFixture<IndexIntegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexIntegComponent]
    });
    fixture = TestBed.createComponent(IndexIntegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
