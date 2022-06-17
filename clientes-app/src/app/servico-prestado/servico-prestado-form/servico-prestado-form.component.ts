import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/clientes/model/cliente';
import { ClientesService } from 'src/app/service/clientes.service';
import { ServicoPrestadoService } from 'src/app/service/servico-prestado.service';
import { ServicoPrestado } from './model/servicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  public clientes: Cliente[];

  public servicoPrestadoForm: FormGroup;

  public clienteForm: FormGroup;

  public limit = 10;

  public offSet = 0;

  public success: boolean = false;

  public errors: string[];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private servicoPrestatoService: ServicoPrestadoService) { }

  ngOnInit(): void {
    this.criarFormularios().then(
      () => this.buscarTodosOsClientes());
  }

  public salvar() {
    const servicoPrestado: ServicoPrestado = this.criarServicoPrestadoComOsForms();
    this.servicoPrestatoService.salvar(servicoPrestado).subscribe(response => {
      if (response.id) {
        this.success = true;
        this.errors = null;
        this.limparFormulario();
      }
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    });

  }

  private criarServicoPrestadoComOsForms(): ServicoPrestado {
    let servicoPrestado = new ServicoPrestado();

    const clienteForm: Cliente = this.clienteForm.getRawValue();

    let servicoPrestadoForm: ServicoPrestado = this.servicoPrestadoForm.getRawValue();

    servicoPrestadoForm.idCliente = +clienteForm.id != 0 ? +clienteForm.id : null;
    servicoPrestadoForm.data = servicoPrestadoForm.data.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

    servicoPrestado = { ...servicoPrestadoForm }

    return servicoPrestado;
  }

  public async buscarTodosOsClientes() {
    this.clienteService.getAllClientes(this.offSet, this.limit).subscribe(response => {
      this.clientes = response.content;
    });
  }

  private async criarFormularios() {
    this.clienteForm = this.formBuilder.group({
      id: [''],
      nome: ['']
    });

    this.servicoPrestadoForm = this.formBuilder.group({
      idCliente: [''],
      descricao: [''],
      preco: [''],
      data: ['']
    });
  }

  private limparFormulario() {
    this.clienteForm.reset();
    this.servicoPrestadoForm.reset();
    this.errors = [];
    this.ngOnInit();
  }

}
