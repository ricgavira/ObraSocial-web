import { AbstractControl } from "@angular/forms";

export class Validacoes {

  static MaiorQue18Anos(formControl: AbstractControl) {
    const nascimento = formControl.value;
    const [ano, mes, dia] = nascimento.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
      return null;

    return { menorDeIdade: true };
  }

  static SenhasCombinam(formControl: AbstractControl) {
    const senha = formControl.get('senha')?.value ?? "";
    const confirmarSenha = formControl.get('confirmarSenha')?.value ?? "";

    if (senha === confirmarSenha) return null;
    
    formControl.get('confirmarSenha')?.setErrors({ senhasNaoCoincidem: true });

    return { senhasNaoCoincidem: true };
  }  
}