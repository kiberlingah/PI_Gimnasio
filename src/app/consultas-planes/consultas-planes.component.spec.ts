import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConsultasPlanesComponent } from './consultas-planes.component';

describe('ConsultasPlanesComponent', () => {
  let component: ConsultasPlanesComponent;
  let fixture: ComponentFixture<ConsultasPlanesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasPlanesComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ConsultasPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
