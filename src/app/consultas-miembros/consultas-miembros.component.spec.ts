import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConsultasMiembrosComponent } from './consultas-miembros.component';


describe('ConsultasMiembrosComponent', () => {
  let component: ConsultasMiembrosComponent;
  let fixture: ComponentFixture<ConsultasMiembrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasMiembrosComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ConsultasMiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


