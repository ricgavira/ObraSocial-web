import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raca } from '../../enums/raca.enum';
import { Classificacao } from '../../enums/classificacao.enum';
import { WebcamModule, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { Contato } from '../../contato/contato.model';
import { Endereco } from '../../endereco/endereco.model';
import { IPessoaFisica } from '../interface/IPessoaFisica';
import { PessoaFisicaService } from '../pessoa-fisica.service';
import Swal from 'sweetalert2';
import { CpfCnpjValidator } from '../../utils/CpfCnpjValidator';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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
    MomentDateModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pr-BR' },
    { provide: MAT_DATE_FORMATS, useValue: OS_DATE_FORMATS },
    provideNgxMask()
  ],
  templateUrl: './pessoa-fisica-cadastrar.component.html',
  styleUrl: './pessoa-fisica-cadastrar.component.scss'
})
export class PessoaFisicaCadastrarComponent implements OnInit {
  public pessoaFisicaForm: FormGroup = new FormGroup([]);
  public gravando = signal(false);
  public racas: { id: number; name: string }[] = [];
  public classificacoes: { id: number; name: string }[] = [];

  public showWebcam = false;
  public errors: WebcamInitError[] = [];
  public multipleWebcamsAvailable = false;
  public dataImage: string = '';
  public webcamImage!: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();

  public contatos: Contato[] = [];
  public enderecos: Endereco[] = [];

  public id: string = '';
  public alterando: boolean = false;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder, 
              private service: PessoaFisicaService) {}

  ngOnInit(): void {
    this.pessoaFisicaForm = this.formBuilder.group({
      id: [0],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CpfCnpjValidator.validate]],
      rg: ['', [Validators.required, Validators.maxLength(10)]],
      nomeDaMae: ['', [Validators.required]],
      nomeDoPai: ['', [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      foto: [null],
      raca: [null, [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      naturalidade: ['', [Validators.required]],
      sexo: [null, [Validators.required]],
      classificacao: [null, [Validators.required]]
    });

    this.id = this.route.snapshot.paramMap.get('id') ?? '0';
    this.alterando = this.id != null && parseInt(this.id) > 0;

    for(const x in Raca) {
      if (typeof Raca[x] === 'number') {
        this.racas.push({id: Number(Raca[x]), name: x});
      }
    }

    for(const x in Classificacao){
      if (typeof Classificacao[x] === 'number') {
        this.classificacoes.push({id: Number(Classificacao[x]), name: x});
      }
    }
    
    if (this.alterando) {
      this.service.obterPorId(this.id).subscribe((pessoaFisica) => {
        this.populaForm(pessoaFisica);
      });
    }
  }

  public populaForm(pessoaFisica: IPessoaFisica) {
    this.pessoaFisicaForm.patchValue({
      id: pessoaFisica.id,
      nome: pessoaFisica.nome,
      cpf: pessoaFisica.cpf,
      rg: pessoaFisica.rg,
      nomeDaMae: pessoaFisica.nomeDaMae,
      nomeDoPai: pessoaFisica.nomeDoPai,
      dataNascimento: pessoaFisica.dataNascimento,
      foto: pessoaFisica.foto,
      raca: pessoaFisica.raca,
      nacionalidade: pessoaFisica.nacionalidade,
      naturalidade: pessoaFisica.naturalidade,
      sexo: pessoaFisica.sexo,
      classificacao: pessoaFisica.classificacao
    });

    this.dataImage = pessoaFisica.foto !== undefined && pessoaFisica.foto !== '' ? `data:image/jpeg;base64,${pessoaFisica.foto}` : '';
  }

  onSubmit() {
    this.gravando.set(true);
    if (this.pessoaFisicaForm.valid){
      this.service.gravar(this.pessoaFisicaForm.value, this.alterando).subscribe({
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
            text: response.error['mensagem'],
            icon: 'error',
            timer: 3000,
            showConfirmButton: false
          });
        }
      });
    }
    else {
      this.pessoaFisicaForm.markAllAsTouched();
      this.gravando.set(false);
      Swal.fire({
        title: 'Atenção!',
        text: 'Favor conferir o preenchimento de todos os campos!',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false
      });      
    }
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
    this.pessoaFisicaForm.get('foto')?.setValue(null);
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
    this.pessoaFisicaForm.get('foto')?.setValue(webcamImage.imageAsBase64);
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