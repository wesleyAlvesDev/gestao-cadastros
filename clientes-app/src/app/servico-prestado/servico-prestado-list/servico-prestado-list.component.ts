import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicoPrestadoService } from 'src/app/service/servico-prestado.service';
import { ServicoPrestadoBusca } from '../servico-prestado-form/model/servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit {

  public servicos: ServicoPrestadoBusca[] = [];

  public totalDeServicos: number = 0;

  public dataSource: MatTableDataSource<ServicoPrestadoBusca>;
  public displayedColumns: string[] = ['nome', 'descricao', 'valor', 'data', 'acoes'];

  public pageSize: number = 10;
  public pageList: number = 0;
  public pageEvent;

  public meses = [
    { mes: "Janeiro", valor: 1 },
    { mes: "Fevereiro", valor: 2 },
    { mes: "Março", valor: 3 },
    { mes: "Abril", valor: 4 },
    { mes: "Maio", valor: 5 },
    { mes: "Junho", valor: 6 },
    { mes: "Julho", valor: 7 },
    { mes: "Agosto", valor: 8 },
    { mes: "Setembro", valor: 9 },
    { mes: "Outubro", valor: 10 },
    { mes: "Novembro", valor: 11 },
    { mes: "Dezembro", valor: 12 }

  ];

  public servicoPrestadoForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    private servicoPrestadoService: ServicoPrestadoService) { }

  ngOnInit(): void {
    this.criarFormularios();
  }

  public buscarServico() {
    const params = this.servicoPrestadoForm.getRawValue();
    const nome: string = params.nome != null || params.nome != '' ? params.nome : null;
    const mes: number = params.mes != null ? +params.mes : null;
    this.servicoPrestadoService.buscarServico(nome, mes, this.pageList, this.pageSize).subscribe(response => {
      this.servicos = response.content;
      this.totalDeServicos = response.totalElements;
      this.pageSize = response.size;
      this.dataSource = new MatTableDataSource<ServicoPrestadoBusca>(this.servicos);
      this.dataSource.data = this.servicos;


      this.paginator._intl.itemsPerPageLabel = 'Itens por página';
      this.paginator._intl.nextPageLabel = 'Página seguinte';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.firstPageLabel = 'Primeira página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
    });
  }

  public pageNavigations(event?: PageEvent) {
    this.pageList = event.pageIndex;
    this.pageSize = event.pageSize;
    this.buscarServico();
  }

  private criarFormularios() {
    this.servicoPrestadoForm = this.formBuilder.group({
      nome: [''],
      mes: ['']
    });
  }

}
