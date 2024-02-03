import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaFisicaCadastrarComponent } from './pessoa-fisica-cadastrar.component';

describe('PessoaFisicaCadastrarComponent', () => {
  let component: PessoaFisicaCadastrarComponent;
  let fixture: ComponentFixture<PessoaFisicaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaFisicaCadastrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaFisicaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
