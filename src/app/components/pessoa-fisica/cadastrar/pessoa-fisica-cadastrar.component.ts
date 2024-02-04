import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { Raca } from '../../enums/raca.enum';
import { Classificacao } from '../../enums/classificacao.enum';
import { WebcamModule, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { Contato } from '../../contato/contato.model';
import { Endereco } from '../../endereco/endereco.model';
import { PessoaFisica } from '../pessoa-fisica.model';
import { PessoaFisicaService } from '../pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CpfCnpjValidator } from '../../utils/CpfCnpjValidator';
import { MomentDateModule } from '@angular/material-moment-adapter';

export const OS_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-pessoa-fisica-cadastrar',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    WebcamModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pr-BR' },
    { provide: MAT_DATE_FORMATS, useValue: OS_DATE_FORMATS }
  ],
  templateUrl: './pessoa-fisica-cadastrar.component.html',
  styleUrl: './pessoa-fisica-cadastrar.component.scss'
})
export class PessoaFisicaCadastrarComponent implements OnInit {
  public pessoaFisicaForm!: FormGroup;
  public gravando = signal(false);
  public racas: { id: number; name: string }[] = [];
  public classificacoes: { id: number; name: string }[] = [];

  public showWebcam = false;
  public errors: WebcamInitError[] = [];
  public multipleWebcamsAvailable = false;
  public dataImage: string = '';
  private base64Image: string = '';
  public webcamImage!: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();

  public contatos: Contato[] = [];
  public enderecos: Endereco[] = [];

  constructor(private router: Router, 
              private formBuilder: FormBuilder, 
              private service: PessoaFisicaService) {}

  ngOnInit(): void {
    for(var x in Raca) {
      if (typeof Raca[x] === 'number') {
        this.racas.push({id: Number(Raca[x]), name: x});
      }
    }

    for(var x in Classificacao){
      if (typeof Classificacao[x] === 'number') {
        this.classificacoes.push({id: Number(Classificacao[x]), name: x});
      }
    }
    
    this.pessoaFisicaForm = this.formBuilder.group({
      id: [0],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CpfCnpjValidator.validate]],
      rg: ['', [Validators.required, Validators.maxLength(10)]],
      nomeDaMae: ['', [Validators.required]],
      nomeDoPai: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      foto: [null],
      raca: ['', [Validators.required]],
      nacionalidade: ['Brasileira', [Validators.required]],
      naturalidade: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      classificacao: ['', [Validators.required]]
    });    
  }

  onSubmit() {
    this.gravando.set(true);
    if (this.pessoaFisicaForm.valid){
      const pessoaFisicaModel = this.BuildModel();
      this.service.gravar(pessoaFisicaModel).subscribe({
        next: () => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Cadastro realizado com sucesso!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
                this.router.navigate(['home', { outlets: { outletHome: ['pessoafisica']}}]);
            });
        },
        error: (response) => {
          this.gravando.set(false);
          Swal.fire({
            title: 'Erro!',
            text: response.token,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    }
    else {
      this.pessoaFisicaForm.markAllAsTouched();
    }
  }

  private BuildModel(): PessoaFisica {
    const modelo = new PessoaFisica();
    modelo.id = this.pessoaFisicaForm.get('id')?.value;
    modelo.nome = this.pessoaFisicaForm.get('nome')?.value;
    modelo.cpf = this.pessoaFisicaForm.get('cpf')?.value;
    modelo.rg = this.pessoaFisicaForm.get('rg')?.value;
    modelo.nomeDaMae = this.pessoaFisicaForm.get('nomeDaMae')?.value;
    modelo.nomeDoPai = this.pessoaFisicaForm.get('nomeDoPai')?.value;
    modelo.raca = this.pessoaFisicaForm.get('raca')?.value;
    modelo.sexo = this.pessoaFisicaForm.get('sexo')?.value;
    modelo.classificacao = this.pessoaFisicaForm.get('classificacao')?.value;
    modelo.naturalidade = this.pessoaFisicaForm.get('naturalidade')?.value;
    modelo.nacionalidade = this.pessoaFisicaForm.get('nacionalidade')?.value;
    modelo.dataNascimento = this.pessoaFisicaForm.get('dataNascimento')?.value;
    modelo.foto = this.base64Image;
    modelo.contatosDto = this.contatos;
    modelo.enderecosDto = this.enderecos;

    return modelo;
  }

  onCancel() {
    this.router.navigate(['home', { outlets: { outletHome: ['pessoafisica']}}]);
  }

  public FieldValid(inputName: string, validatorsName: string[]): boolean {    
    let valido: boolean = true;

    if (this.pessoaFisicaForm.get(inputName) != null) {
      validatorsName.forEach(validator => {        
        valido = valido && (!(this.pessoaFisicaForm.get(inputName)!.hasError(validator)) && this.pessoaFisicaForm.get(inputName)!.touched);
      });
    }

    return valido;
  }

  public onOpenCam(): void {
    if (this.imagemExiste())
      this.onLimparFoto();

    this.showWebcam = !this.showWebcam;
  }

  public onCapture(): void {
    this.trigger.next();
  }

  public onLimparFoto(): void {
    this.showWebcam = false;
    this.dataImage = '';
  }

  public imagemExiste(): boolean {
    return this.dataImage != '';
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.dataImage = webcamImage.imageAsDataUrl;
    this.base64Image = webcamImage.imageAsBase64;    
    this.showWebcam = !this.imagemExiste();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {
      facingMode: {ideal: ''},
      width: {ideal: 1024},
      height: {ideal: 576}
    };

    return result;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  } 
}