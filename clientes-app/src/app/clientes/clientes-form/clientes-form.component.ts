import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/service/clientes.service';
import { Cliente } from '../model/cliente';
import { ActivatedRoute, Router } from "@angular/router";
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  public cliente: Cliente;

  public clienteForm: FormGroup;

  public success: boolean = false;

  public errors: string[];

  public btnSalvar: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.criarFormularios();

    this.activatedRoute.params.subscribe(urlParams => {
      if (urlParams && urlParams.id) {
        const id = parseInt(urlParams.id);
        this.buscarCliente(id);
      }
      return;
    });
  }

  public buscarCliente(id: number) {
    this.clienteService.getClienteById(id).subscribe(response => {
      if (response) {
        this.preencherCampos(response);
      }
    });
  }

  public isExistsCpf(cpf) {
    if (cpf?.length == 11) {
      this.clienteService.getClienteByCpf(cpf).subscribe(response => {
        if (response.id != null) {
          this.errors = ['Já existe um cadastro com esse CPF.'];
          this.btnSalvar = true;
        }
      }, error => {
        if (error.status === 404) {
          console.log('Not found');
        }
        this.errors = [];
        this.btnSalvar = false;
        return EMPTY;
      });
    }
  }

  public salvar() {
    const cliente = this.criarClienteComForm();
    if (cliente.id) {
      this.clienteService.atualizarCliente(cliente, cliente.id).subscribe(response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.success = false;
        this.errors = ['Erro ao atualizar o cliente.'];
      });

    } else {
      this.clienteService.salvarCliente(cliente).subscribe(respose => {
        this.success = true;
        this.errors = [];
        this.preencherCampos(respose);

      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
    }
  }

  public criarClienteComForm(): Cliente {
    let cliente = new Cliente();
    cliente = this.clienteForm.getRawValue();
    return cliente;
  }

  private preencherCampos(cliente: Cliente) {
    this.preencherForm(cliente, this.clienteForm);
  }

  private preencherForm(obj, form) {
    if (!obj) {
      return;
    }

    Object.keys(obj).forEach(campo => {
      if (campo && form.contains(campo)) {
        form.get(campo).setValue(obj[campo]);
      }
    });
  }

  public limparFormulario() {
    this.success = false;
    this.errors = [];
    this.clienteForm.reset();
    this.criarFormularios();
  }

  public criarFormularios() {
    this.clienteForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataCadastro: ['']
    });
  }

  public voltarParaListagem() {
    this.router.navigate(['/clientes/list']);
  }
}
