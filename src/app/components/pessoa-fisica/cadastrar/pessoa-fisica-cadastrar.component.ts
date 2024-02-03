import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Raca } from '../../enums/raca.enum';
import { ClassificacaoPessoaFisica } from '../../enums/classificacao.enum';
import { OsFieldRequiredComponent } from '../../core/os-field-required/os-field-required.component';

@Component({
  selector: 'app-pessoa-fisica-cadastrar',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    OsFieldRequiredComponent
  ],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  templateUrl: './pessoa-fisica-cadastrar.component.html',
  styleUrl: './pessoa-fisica-cadastrar.component.scss'
})
export class PessoaFisicaCadastrarComponent implements OnInit {
  pessoaFisicaForm!: FormGroup;
  gravando = signal(false);
  racas: string[] = Object.keys(Raca).filter(value => isNaN(Number(value)) === false).map(key => Raca[parseInt(key)]);
  classificacoes: string[] = Object.keys(ClassificacaoPessoaFisica).filter(value => isNaN(Number(value)) === false).map(key => ClassificacaoPessoaFisica[parseInt(key)]);

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.pessoaFisicaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      nomeDaMae: ['', [Validators.required]],
      nomeDoPai: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      raca: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      naturalidade: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      classificacao: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.gravando.set(true);
    if (this.pessoaFisicaForm.valid){
      
    }
    else {
      this.pessoaFisicaForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['home', { outlets: { outletHome: ['pessoafisica']}}]);
  }

  isInvalid(inputName: string, validatorName: string) {
    const formControl: any = this.pessoaFisicaForm.get(inputName);
    if (formControl?.errors != null) {
      return formControl.errors[validatorName] && formControl.touched;
    }
  }
}