import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/service/clientes.service';
import { Cliente } from '../model/cliente';
import { Router } from "@angular/router";

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  public clientes: Cliente[] = [];

  public dataSource: MatTableDataSource<Cliente>;
  public displayedColumns: string[] = ['id', 'nome', 'cpf', 'dataCadastro', 'acoes'];

  public totalDeClientes: number = 0;
  public pageSize: number = 10;
  public pageList: number = 0;
  public pageEvent;

  public clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private clienteService: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  public listarClientes() {
    this.pageList = this.pageList == null || this.pageList == undefined ? 0 : this.pageList;
    this.pageSize = this.pageSize == null || this.pageSize == undefined ? 10 : this.pageSize;
    this.clienteService.getAllClientes(this.pageList, this.pageSize).subscribe(response => {
      this.clientes = response.content;
      this.totalDeClientes = response.totalElements;
      this.pageSize = response.pageSize;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.data = this.clientes;

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
    this.listarClientes();
  }

  public preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  public deletarCliente() {
    this.clienteService.deletarCliente(this.clienteSelecionado.id).subscribe(
      response => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!'
        this.ngOnInit();
      }, erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
    );
  }

  public novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

}
