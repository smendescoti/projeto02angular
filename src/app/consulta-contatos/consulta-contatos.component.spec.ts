import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaContatosComponent } from './consulta-contatos.component';

describe('ConsultaContatosComponent', () => {
  let component: ConsultaContatosComponent;
  let fixture: ComponentFixture<ConsultaContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
