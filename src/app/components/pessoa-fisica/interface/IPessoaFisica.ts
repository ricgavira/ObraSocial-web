import { Contato } from "../../contato/contato.model";
import { Endereco } from "../../endereco/endereco.model";
import { Classificacao } from "../../enums/classificacao.enum";
import { Raca } from "../../enums/raca.enum";
import { Sexo } from "../../enums/sexo.enum";

export interface IPessoaFisica {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    nomeDaMae: string;
    nomeDoPai: string;
    raca?: Raca;
    sexo?: Sexo;
    classificacao?: Classificacao;
    naturalidade: string;
    nacionalidade: string;
    dataNascimento?: Date;
    foto?: string;
    contatosDto?: Contato[];
    enderecosDto?: Endereco[];
}