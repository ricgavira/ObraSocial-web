import { Classificacao } from "../enums/classificacao.enum";
import { Raca } from "../enums/raca.enum";
import { Sexo } from "../enums/sexo.enum";

export class PessoaFisicaSimples {
    id: number = 0;
    nome: string = '';
    cpf: string = '';
    rg: string = '';
    nomeDaMae: string = '';
    nomeDoPai: string = '';
    raca?: Raca;
    sexo?: Sexo;
    classificacao?: Classificacao;
    naturalidade: string = '';
    nacionalidade: string = '';
    dataNascimento?: Date;
}