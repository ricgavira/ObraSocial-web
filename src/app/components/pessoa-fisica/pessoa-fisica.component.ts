import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PessoaFisica } from './pessoa-fisica.model';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pessoa-fisica',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './pessoa-fisica.component.html',
  styleUrl: './pessoa-fisica.component.scss'
})
export class PessoaFisicaComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  public colunas: string[] = ['codigo', 'nome', 'dt-nascimento', 'nome-mae', 'acoes'];
  public dataSource: MatTableDataSource<PessoaFisica> = new MatTableDataSource<PessoaFisica>();

  constructor(private service: PessoaFisicaService, private router: Router) {}

  ngAfterViewInit(): void {
    this.service.obterTodosSimples().subscribe((response) => {
      this.dataSource = new MatTableDataSource<PessoaFisica>(response);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Itens por página';
      this.paginator._intl.firstPageLabel = 'Primeira página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.nextPageLabel = 'Próxima página';
      this.paginator._intl.previousPageLabel = 'Página Anterior';
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(id: number) {    
    this.router.navigate(['home', { outlets: { outletHome: ['pessoafisicacadastrar', id]}}]);
  }

  onNovo() {
    this.router.navigate(['home', { outlets: { outletHome: ['pessoafisicacadastrar']}}]);
  }
}