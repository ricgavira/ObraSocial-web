import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';
import { PessoaJuridicaComponent } from './components/pessoa-juridica/pessoa-juridica.component';
import { CursoComponent } from './components/curso/curso.component';
import { TurmaComponent } from './components/turma/turma.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { PessoaFisicaCadastrarComponent } from './components/pessoa-fisica/cadastrar/pessoa-fisica-cadastrar.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'main',
                component: MainComponent,
                outlet: 'outletHome'
            },
            {
                path: 'pessoafisica',
                component: PessoaFisicaComponent,
                outlet: 'outletHome'
            },
            {
                path: 'pessoafisicacadastrar',
                component: PessoaFisicaCadastrarComponent,
                outlet: 'outletHome'
            },
            {
                path: 'pessoafisicacadastrar/:id',
                component: PessoaFisicaCadastrarComponent,
                outlet: 'outletHome'
            },
            {
                path: 'pessoajuridica',
                component: PessoaJuridicaComponent,
                outlet: 'outletHome'
            },
            {
                path: 'curso',
                component: CursoComponent,
                outlet: 'outletHome'
            },
            {
                path: 'turma',
                component: TurmaComponent,
                outlet: 'outletHome'
            },
            {
                path: 'matricula',
                component: MatriculaComponent,
                outlet: 'outletHome'
            }
        ]
    }
];