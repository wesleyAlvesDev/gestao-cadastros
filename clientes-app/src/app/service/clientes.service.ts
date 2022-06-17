import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/model/cliente';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlBase = `${environment.urlBase}/api/clientes`;

  constructor(private httpCliente: HttpClient) { }

  public salvarCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpCliente.post<Cliente>(this.urlBase, cliente);
  }

  public atualizarCliente(cliente: Cliente, id: number): Observable<any> {
    const url = `${this.urlBase}/${id}`;
    return this.httpCliente.put<Cliente>(url, cliente);
  }

  public getAllClientes(offset?: number, limit?: number): Observable<any> {
    const url = `${this.urlBase}?page=${offset}&size=${limit}`
    return this.httpCliente.get<any>(url);
  }

  public getClienteById(id: number): Observable<Cliente> {
    const url = `${this.urlBase}/${id}`;
    return this.httpCliente.get<any>(url);
  }

  public getClienteByCpf(cpf: string): Observable<Cliente> {
    const url = `${this.urlBase}/cpf/${cpf}`;
    return this.httpCliente.get<any>(url);
  }

  public deletarCliente(id: number): Observable<any> {
    const url = `${this.urlBase}/${id}`;
    return this.httpCliente.delete(url);
  }
}
