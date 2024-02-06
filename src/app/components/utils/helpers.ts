import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { CpfCnpjValidator } from "./CpfCnpjValidator";

export namespace Helpers {
    export function FieldValid(form: FormGroup, inputName: string, validatorsName: string[]): boolean {
        let valido: boolean = true;
    
        if (form.get(inputName) != null) {
          validatorsName.forEach(validator => {        
            valido = valido && (!(form.get(inputName)!.hasError(validator)) && form.get(inputName)!.touched);
          });
        }
    
        return valido;
    }

    export function CPFValidator(control: AbstractControl<FormControl, FormControl>): ValidationErrors | null {
        return CpfCnpjValidator.validate(control);
    }

    export function CNPJValidator(control: AbstractControl<FormControl, FormControl>): ValidationErrors | null {
        return CpfCnpjValidator.validate(control);
    }

    export function MaiorQue18Anos(fieldDataNascimento: AbstractControl) {
        const nascimento = fieldDataNascimento.value;
        const [ano, mes, dia] = nascimento.split('-');
        const hoje = new Date();
        const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
        const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...
    
        if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
          return null;
    
        return { menorDeIdade: true };
      }    
}