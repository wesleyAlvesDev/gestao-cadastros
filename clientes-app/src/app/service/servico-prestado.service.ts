import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestado } from '../servico-prestado/servico-prestado-form/model/servicoPrestado';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  private urlBase = `${environment.urlBase}/api/servicos-prestados`;

  constructor(private http: HttpClient) { }

  public salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.urlBase, servicoPrestado);
  }

  public buscarServico(nome: string, mes: number, offSet: number, limit: number): Observable<any> {
    const url = `${this.urlBase}?nome=${nome}&mes=${mes}&page=${offSet}&size=${limit}`;    
    return this.http.get<any>(url);
  }
}
